"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const KEY = "consent";

export function CR() {
  return (
    <button
      type="button"
      className="underline"
      onClick={() => {
        try {
          localStorage.removeItem(KEY);
        } catch {}
        window.location.reload();
      }}
    >
      Muuda küpsiste valikut
    </button>
  );
}

export default function CB() {
  const [c, setC] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    try {
      setC(localStorage.getItem(KEY));
    } catch {
      setC(null);
    }
  }, []);

  const save = (v: "yes" | "no") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    setC(v);
  };

  if (c === undefined) return null;

  return (
    <>
      {c === "yes" && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />}
      {c === null && (
        <div
          role="dialog"
          aria-label="Küpsised"
          className="fixed inset-x-0 bottom-0 z-50 border-t bg-white p-4 text-sm text-black shadow-lg"
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>
              Kasutame Google Analyticsi küpsiseid, et mõista, kuidas saiti
              kasutatakse. Seda tehakse ainult sinu nõusolekul.{" "}
              <Link href="/privaatsus" className="underline">
                Loe lähemalt
              </Link>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => save("no")}
                className="rounded border px-4 py-2"
              >
                Keeldun
              </button>
              <button
                type="button"
                onClick={() => save("yes")}
                className="rounded border border-black bg-black px-4 py-2 text-white"
              >
                Nõustun
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
