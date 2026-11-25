import Image from "next/image";

const cards = [
  {
    title: "Mälestuse hoidmine",
    image: "/candle.jpg",
    position: "object-[50%_85%]",
    items: [
      "Küünalde süütamine",
      "Lillede viimine",
      "Muud teenused kokkuleppel",
    ],
  },
  {
    title: "Hooldusteenused",
    image: "/flower.jpg",
    position: "object-[80%_60%]",
    items: [
      "Hauaplatside hooldus",
      "Urnimatuse järgne koristus",
      "Matusejärgne koristus",
      "Muud teenused kokkuleppel",
    ],
  },
  {
    title: "Hauaplatsi korrastamine ja ehitustööd",
    image: "/candle.jpg",
    position: "object-[50%_35%]",
    items: [
      "Pinnasevahetus",
      "Klassikalise betoonrandi valamine",
      "Äärekividest hauapiirde ehitus",
      "Muud korrastus- ja ehitustööd kokkuleppel",
    ],
  },
];

export default function W() {
  return (
    <section id="teenused" className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-my-font text-4xl font-semibold tracking-tight">
          Teenused
        </h2>
        <p className="mt-4 max-w-4xl text-lg leading-8">
          Meie teenuste hulka kuuluvad: küünalde ja lillede viimine,
          hauaplatside hooldus, urnimatusejärgne koristus, pinnasetööd,
          klassikalise betoonirandi valu, äärekividest hauapiirete ehitus ning
          muud töö ja teenused kokkuleppel.
        </p>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {cards.map((card) => (
            <li
              key={card.title}
              className="rounded-2xl bg-neutral-50 p-8 shadow-[-10px_6px_28px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-2 hover:shadow-[-16px_14px_40px_rgba(0,0,0,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 360px, 90vw"
                  className={`object-cover ${card.position}`}
                />
              </div>
              <h3 className="mt-6 text-2xl font-medium">{card.title}</h3>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-lg">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
