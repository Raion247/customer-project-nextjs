"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { MAX_FILES, MAX_TOTAL_BYTES, formatSize } from "@/lib/attachments";
import { rateLimit } from "@/lib/rate-limit";

export type ContactState = {
  ok: boolean;
  message: string;
  values?: { name: string; email: string; phone: string; message: string };
};

const EMAIL_RE =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const PHONE_RE = /^\+?[0-9\s()-]{5,20}$/;

const isEmail = (value: string) =>
  value.length <= 254 && EMAIL_RE.test(value) && !value.includes("..");

const field = (data: FormData, key: string) => {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
};

// Identify an image by its first bytes. The file name and the type the browser
// reports can be faked, the content can't.
function detectImage(b: Buffer): { ext: string; mime: string } | null {
  if (b.length < 12) return null;
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) {
    return { ext: "jpg", mime: "image/jpeg" };
  }
  if (
    b.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    )
  ) {
    return { ext: "png", mime: "image/png" };
  }
  if (b.subarray(0, 4).toString("latin1") === "GIF8") {
    return { ext: "gif", mime: "image/gif" };
  }
  if (
    b.subarray(0, 4).toString("latin1") === "RIFF" &&
    b.subarray(8, 12).toString("latin1") === "WEBP"
  ) {
    return { ext: "webp", mime: "image/webp" };
  }
  if (b.subarray(4, 8).toString("latin1") === "ftyp") {
    const brand = b.subarray(8, 12).toString("latin1");
    if (
      ["heic", "heix", "hevc", "hevx", "heim", "heis", "mif1", "msf1"].includes(
        brand,
      )
    ) {
      return { ext: "heic", mime: "image/heic" };
    }
  }
  return null;
}

// Keep the visitor's file name, but strip anything odd and force the real extension.
function safeFileName(name: string, ext: string, index: number) {
  const base = name
    .replace(/\.[^.]*$/, "")
    .normalize("NFC")
    .replace(/[^\p{L}\p{N} _-]+/gu, "_")
    .trim()
    .slice(0, 60);
  return `${base || `pilt-${index + 1}`}.${ext}`;
}

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (field(formData, "website")) {
    return { ok: true, message: "Aitäh! Sõnum on saadetud." };
  }

  const values = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    message: field(formData, "message"),
  };
  const fail = (message: string): ContactState => ({
    ok: false,
    message,
    values,
  });

  if (!values.name || values.name.length > 100) {
    return fail("Palun sisesta oma nimi.");
  }
  if (!isEmail(values.email)) {
    return fail("Palun sisesta korrektne e-posti aadress.");
  }
  if (!PHONE_RE.test(values.phone)) {
    return fail("Palun sisesta korrektne telefoninumber.");
  }
  if (!values.message || values.message.length > 5000) {
    return fail("Palun kirjuta sõnum (kuni 5000 märki).");
  }
  if (formData.get("consent") !== "on") {
    return fail("Palun nõustu privaatsustingimustega.");
  }

  // Attached images (optional).
  const uploads = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File && f.size > 0);
  if (uploads.length > MAX_FILES) {
    return fail(`Lisada saab kuni ${MAX_FILES} pilti.`);
  }
  if (uploads.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_BYTES) {
    return fail(
      `Pildid on kokku liiga suured (lubatud kuni ${formatSize(MAX_TOTAL_BYTES)}).`,
    );
  }
  const attachments: { filename: string; content: Buffer; contentType: string }[] =
    [];
  for (const [i, file] of uploads.entries()) {
    const content = Buffer.from(await file.arrayBuffer());
    const kind = detectImage(content);
    if (!kind) {
      return fail(
        `Fail "${file.name}" ei ole toetatud pilt (lubatud: JPG, PNG, WebP, GIF, HEIC).`,
      );
    }
    attachments.push({
      filename: safeFileName(file.name, kind.ext, i),
      content,
      contentType: kind.mime,
    });
  }

  // Rate limit: 3 messages per visitor per 10 minutes, 30 per hour overall.
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  if (
    !rateLimit(`ip:${ip}`, 3, 10 * 60_000) ||
    !rateLimit("global", 30, 60 * 60_000)
  ) {
    return fail("Liiga palju katseid. Proovi mõne minuti pärast uuesti.");
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error("Contact form: SMTP_* / CONTACT_TO env vars are not set.");
    return fail("Sõnumi saatmine ebaõnnestus. Proovi hiljem uuesti.");
  }

  const port = Number(SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 8000,
  });

  try {
    await transporter.sendMail({
      from: `"Kalmuhooldus veebileht" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: values.email,
      subject: `Uus sõnum veebilehelt: ${values.name.replace(/[\r\n]+/g, " ")}`,
      text: [
        `Nimi: ${values.name}`,
        `E-post: ${values.email}`,
        `Telefon: ${values.phone}`,
        `Manused: ${attachments.length ? `${attachments.length} pilti` : "puuduvad"}`,
        "",
        values.message,
      ].join("\n"),
      attachments,
    });
  } catch (error) {
    console.error("Contact form: sending failed", error);
    return fail("Sõnumi saatmine ebaõnnestus. Proovi hiljem uuesti.");
  }

  // Confirmation copy for the sender. It is generic on purpose (no name or
  // message text), so it can't be used to send someone else's words to a
  // third party. A failure here must not hide that the admin got the message.
  try {
    await transporter.sendMail({
      from: `"Kalmuhooldus OÜ" <${SMTP_USER}>`,
      to: values.email,
      replyTo: CONTACT_TO,
      subject: "Oleme sinu sõnumi kätte saanud",
      text: [
        "Tere!",
        "",
        "Aitäh, et kirjutasid Kalmuhooldus OÜ-le. Saime sinu sõnumi kätte ja vastame sulle esimesel võimalusel.",
        "",
        "Kui sa ei saatnud meile sõnumit, võid selle kirja ignoreerida.",
      ].join("\n"),
      headers: { "Auto-Submitted": "auto-generated" },
    });
  } catch (error) {
    console.error("Contact form: confirmation failed", error);
  }

  return { ok: true, message: "Aitäh! Sõnum on saadetud." };
}
