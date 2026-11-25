import Image from "next/image";

export type Comment = {
  id: string;
  text: string;
  name: string;
  role?: string;
  /** Optional photo. Falls back to the placeholder avatar. */
  avatar?: string;
};

// Placeholders. Replace with the comments the admin adds.
const placeholderComments: Comment[] = [
  { id: "1", text: "Töö tehti hoolikalt.", name: "Klient A", role: "Klient" },
  {
    id: "2",
    text: "Istutused näevad ilusad välja.",
    name: "Klient B",
    role: "Klient",
  },
  {
    id: "3",
    text: "Suhtlus oli kiire ja selge.",
    name: "Klient C",
    role: "Klient",
  },
];

function PlaceholderAvatar() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <rect width="64" height="64" fill="#d6d3d1" />
      <circle cx="32" cy="25" r="11" fill="#78716c" />
      <path d="M10 64c0-13 9.8-22 22-22s22 9 22 22z" fill="#78716c" />
    </svg>
  );
}

export default function CS({
  comments = placeholderComments,
}: {
  comments?: Comment[];
}) {
  return (
    <section id="arvamused" className="bg-white text-stone-800">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-my-font text-center text-4xl font-semibold tracking-tight">
          Mida kliendid arvavad?
        </h2>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {comments.map((c) => (
            <li
              key={c.id}
              className="flex flex-col justify-between rounded-2xl bg-neutral-50 p-8 shadow-[-10px_6px_28px_rgba(0,0,0,0.18)]"
            >
              <figure className="flex h-full flex-col justify-between gap-8">
                <blockquote className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -top-4 -left-1 select-none font-serif text-7xl leading-none text-stone-300"
                  >
                    “
                  </span>
                  <p className="relative pt-8 text-lg leading-8">{c.text}</p>
                </blockquote>

                <figcaption className="flex items-center justify-end gap-4">
                  <div className="text-right">
                    <p className="font-semibold">{c.name}</p>
                    {c.role && (
                      <p className="text-sm text-stone-600">{c.role}</p>
                    )}
                  </div>
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                    {c.avatar ? (
                      <Image
                        src={c.avatar}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <PlaceholderAvatar />
                    )}
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
