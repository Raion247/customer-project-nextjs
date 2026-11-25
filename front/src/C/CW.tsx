"use client";

import Image from "next/image";
import { useState } from "react";

export type Work = {
  id: string;
  src: string;
  alt: string;
  category: string;
  /** Tailwind aspect class, e.g. "aspect-square" */
  aspect?: string;
  /** Tailwind object-position class, e.g. "object-[50%_80%]" */
  position?: string;
};

const categories = [
  { id: "all", label: "Kõik" },
  { id: "hooldus", label: "Hooldusteenused" },
  { id: "korrastamine", label: "Hauaplatsi korrastamine ja ehitustööd" },
];

// Placeholders. Replace with the images the admin uploads.
const placeholderWorks: Work[] = [
  {
    id: "1",
    src: "/candle.jpg",
    alt: "Latern hauaplatsil",
    category: "hooldus",
    aspect: "aspect-square",
    position: "object-[50%_85%]",
  },
  {
    id: "2",
    src: "/flower.jpg",
    alt: "Roos kivil",
    category: "korrastamine",
    aspect: "aspect-[4/5]",
    position: "object-[80%_60%]",
  },
  {
    id: "3",
    src: "/candle.jpg",
    alt: "Lilled hauaplatsil",
    category: "hooldus",
    aspect: "aspect-[4/5]",
    position: "object-[50%_35%]",
  },
  {
    id: "4",
    src: "/flower.jpg",
    alt: "Kivipink",
    category: "korrastamine",
    aspect: "aspect-[4/3]",
    position: "object-[50%_90%]",
  },
  {
    id: "5",
    src: "/candle.jpg",
    alt: "Lumine hauaplats",
    category: "hooldus",
    aspect: "aspect-[4/3]",
    position: "object-[50%_60%]",
  },
  {
    id: "6",
    src: "/flower.jpg",
    alt: "Roosi lähivõte",
    category: "korrastamine",
    aspect: "aspect-square",
    position: "object-[85%_65%]",
  },
];

export default function CW({ works = placeholderWorks }: { works?: Work[] }) {
  const [active, setActive] = useState("all");
  const visible =
    active === "all" ? works : works.filter((w) => w.category === active);

  return (
    <section id="tood" className="bg-white text-stone-800">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-my-font text-center text-4xl font-semibold tracking-tight">
          Meie tehtud tööd
        </h2>

        <div className="mt-12 flex justify-center">
          <div className="flex flex-wrap justify-center overflow-hidden rounded-lg bg-neutral-100 shadow-md">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={active === c.id}
                onClick={() => setActive(c.id)}
                className={`px-5 py-4 font-semibold transition-colors ${
                  active === c.id
                    ? "bg-stone-700 text-white"
                    : "hover:bg-neutral-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {visible.map((w) => (
            <li key={w.id} className="mb-6 break-inside-avoid">
              <div
                className={`relative overflow-hidden rounded-2xl ${w.aspect ?? "aspect-square"}`}
              >
                <Image
                  src={w.src}
                  alt={w.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 90vw"
                  className={`object-cover ${w.position ?? ""}`}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
