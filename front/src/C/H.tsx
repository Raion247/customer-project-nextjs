"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CRT from "./CRT";

const links = [
  { label: "Meist", href: "/#about" },
  { label: "Teenused", href: "/#teenused" },
  { label: "Tehtud tööd", href: "/#tood" },
  { label: "Kontakt", href: "/#kontakt" },
  { label: "Hinnakiri", href: "/hinnakiri" },
];

function CertLink({ className }: { className: string }) {
  return (
    <a
      href="#"
      title="Vaata EVUL sertifikaati"
      target="_blank"
      rel="noopener noreferrer"
      className={`relative ${className}`}
    >
      <CRT className="h-full w-full" />
      <span className="absolute bottom-[-8px] right-[1px]">®</span>
    </a>
  );
}

export default function H() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Next.js won't scroll for a link to the page you're already on while the
  // sticky header is in view, so do it by hand on the home page.
  const onLogoClick = (e: React.MouseEvent) => {
    setOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0 });
      window.history.replaceState(null, "", "/");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-x-20 px-6 py-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="Kalmuhooldus"
          className="flex w-fit shrink-0 md:justify-self-end"
          onClick={onLogoClick}
        >
          <Image
            src="/logo.png"
            alt="Kalmuhooldus logo"
            height={140}
            width={140}
            priority
            className="h-auto w-24 max-w-none md:w-35"
          />
        </Link>

        <button
          type="button"
          aria-label={open ? "Sulge menüü" : "Ava menüü"}
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 hover:bg-stone-100 md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="h-8 w-8"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <nav
          id="main-menu"
          aria-label="Main"
          className={`${open ? "block" : "hidden"} absolute inset-x-0 top-full border-t border-stone-200 bg-white px-6 py-4 shadow-md md:static md:block md:justify-self-center md:border-0 md:p-0 md:shadow-none`}
        >
          <ul className="font-my-font flex flex-col gap-1 text-xl font-medium md:flex-row md:flex-wrap md:items-center md:gap-x-6 md:gap-y-2 md:text-3xl">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="relative inline-block py-3 transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:text-black/60 hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none md:py-0 md:after:-bottom-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <CertLink className="mt-2 block h-20 w-20 md:hidden" />
        </nav>

        <CertLink className="hidden h-22 w-22 left-4 md:block" />
      </div>
    </header>
  );
}
