"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { sendMessage, type ContactState } from "@/app/actions";
import {
  ACCEPT,
  MAX_FILES,
  MAX_TOTAL_BYTES,
  formatSize,
} from "@/lib/attachments";

const initialState: ContactState = { ok: false, message: "" };

// Browsers show validation pop-ups in their own language, so set Estonian ones.
function validationMessage(el: HTMLInputElement | HTMLTextAreaElement) {
  const v = el.validity;
  if (v.valueMissing) {
    return el.name === "consent"
      ? "Palun nõustu privaatsustingimustega."
      : "Palun täida see väli.";
  }
  if (el.name === "email") {
    return "Palun sisesta korrektne e-posti aadress, nt nimi@näide.ee.";
  }
  if (el.name === "phone") {
    return "Palun sisesta korrektne telefoninumber, nt +372 5555 5555.";
  }
  return "Palun kontrolli seda välja.";
}

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|heic|heif)$/i;

function SmallIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
    >
      {children}
    </svg>
  );
}

const inputClass =
  "w-full rounded-xl bg-white px-4 py-3.5 text-stone-800 placeholder:text-stone-500 focus:outline-2 focus:outline-offset-2 focus:outline-white";

export default function CT() {
  const [state, action, pending] = useActionState(sendMessage, initialState);
  const values = state.values;

  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  // Clear the attached files once a message has gone through.
  const [prevState, setPrevState] = useState(state);
  if (state !== prevState) {
    setPrevState(state);
    if (state.ok) {
      setFiles([]);
      setFileError("");
    }
  }

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  function addFiles(list: FileList | null) {
    if (!list) return;
    let next = [...files];
    let error = "";
    for (const file of Array.from(list)) {
      const isImage = file.type.startsWith("image/") || IMAGE_EXT.test(file.name);
      if (!isImage || !IMAGE_EXT.test(file.name)) {
        error = `"${file.name}" ei ole toetatud pilt (JPG, PNG, WebP, GIF, HEIC).`;
        continue;
      }
      if (next.some((f) => f.name === file.name && f.size === file.size)) continue;
      if (next.length >= MAX_FILES) {
        error = `Lisada saab kuni ${MAX_FILES} pilti.`;
        break;
      }
      if (next.reduce((sum, f) => sum + f.size, 0) + file.size > MAX_TOTAL_BYTES) {
        error = `Pildid võivad kokku olla kuni ${formatSize(MAX_TOTAL_BYTES)}.`;
        continue;
      }
      next = [...next, file];
    }
    setFiles(next);
    setFileError(error);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError("");
  }

  // Open the picked file in a new tab so the sender can check what they attached.
  function openFile(file: File) {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank", "noopener");
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  function submit(formData: FormData) {
    files.forEach((f) => formData.append("images", f));
    action(formData);
  }

  return (
    <section id="kontakt" className="bg-neutral-100">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <form
          action={submit}
          onInvalidCapture={(e) => {
            const el = e.target as HTMLInputElement | HTMLTextAreaElement;
            el.setCustomValidity(validationMessage(el));
          }}
          onInputCapture={(e) => {
            (e.target as HTMLInputElement).setCustomValidity("");
          }}
          className="rounded-lg bg-linear-to-b from-stone-800 to-stone-600 p-8 text-white shadow-lg"
        >
          <h2 className="text-2xl font-bold">Saada meile sõnum</h2>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="sr-only">Ees- ja perekonnanimi</span>
              <input
                name="name"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                placeholder="Ees- ja Perekonnanimi"
                defaultValue={values?.name}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="sr-only">E-posti aadress</span>
              <input
                name="email"
                type="email"
                required
                pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9\-]+(\.[A-Za-z0-9\-]+)*\.[A-Za-z]{2,}"
                maxLength={254}
                autoComplete="email"
                placeholder="Emaili aadress"
                defaultValue={values?.email}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="sr-only">Telefon</span>
              <input
                name="phone"
                type="tel"
                required
                minLength={5}
                maxLength={20}
                pattern="\+?[0-9\s\(\)\-]{5,20}"
                title="Sisesta telefoninumber, nt +372 5555 5555"
                autoComplete="tel"
                placeholder="Telefon"
                defaultValue={values?.phone}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="sr-only">Sõnum</span>
              <textarea
                name="message"
                required
                maxLength={5000}
                rows={5}
                placeholder="Kirjuta oma sõnum siia"
                defaultValue={values?.message}
                className={`${inputClass} resize-y`}
              />
            </label>

            <div>
              <input
                id="images"
                type="file"
                multiple
                accept={ACCEPT}
                className="peer sr-only"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              <label
                htmlFor="images"
                className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-dashed border-white/40 px-4 py-3 text-white/90 transition-colors hover:border-white/70 hover:bg-white/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white"
              >
                <SmallIcon>
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </SmallIcon>
                <span className="font-medium">Lisa pilte</span>
                <span className="text-sm text-white/60">
                  (valikuline, kuni {MAX_FILES} pilti, kokku {formatSize(MAX_TOTAL_BYTES)})
                </span>
              </label>

              {files.length > 0 && (
                <>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {files.map((file, i) => (
                      <li
                        key={`${file.name}-${file.size}-${file.lastModified}`}
                        className="flex max-w-full items-center rounded-lg bg-white/10 text-sm"
                      >
                        <button
                          type="button"
                          onClick={() => openFile(file)}
                          title="Ava pilt uues aknas"
                          className="flex min-w-0 items-center gap-2 rounded-l-lg py-2 pl-3 pr-2 hover:bg-white/10"
                        >
                          <SmallIcon>
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21" />
                          </SmallIcon>
                          <span className="truncate">{file.name}</span>
                          <span className="shrink-0 text-white/60">
                            {formatSize(file.size)}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          aria-label={`Eemalda ${file.name}`}
                          className="rounded-r-lg px-2 py-2 hover:bg-white/20"
                        >
                          <SmallIcon>
                            <path d="M6 6l12 12M18 6L6 18" />
                          </SmallIcon>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm text-white/60">
                    {files.length}/{MAX_FILES} pilti · {formatSize(totalSize)} /{" "}
                    {formatSize(MAX_TOTAL_BYTES)}
                  </p>
                </>
              )}
              {fileError && (
                <p role="alert" className="mt-2 text-sm font-medium text-red-200">
                  {fileError}
                </p>
              )}
            </div>

            {/* Honeypot: hidden from people, bots tend to fill it. */}
            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <label className="flex items-center gap-3">
              <input
                name="consent"
                type="checkbox"
                required
                className="h-4 w-4 accent-stone-300"
              />
              <span>
                Nõustun{" "}
                <Link href="/privaatsus" className="underline">
                  privaatsustingimustega
                </Link>
              </span>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-stone-950 px-8 py-3 text-lg font-semibold transition-colors hover:bg-black disabled:opacity-60"
            >
              {pending ? "Saadan..." : "Saada sõnum"}
            </button>
            <p
              role="status"
              className={`font-medium ${state.ok ? "text-green-300" : "text-red-200"}`}
            >
              {state.message}
            </p>
          </div>
        </form>

        <div className="text-right text-stone-800">
          <h2 className="font-my-font text-4xl font-bold leading-tight tracking-tight">
            Otsid parimat hauaplatside hoolduse ja haljastustööde pakkujat?
          </h2>
          <p className="mt-8 text-xl leading-9">
            Saada meile sõnum ning me vastame sulle esimesel võimalusel!
          </p>
        </div>
      </div>
    </section>
  );
}
