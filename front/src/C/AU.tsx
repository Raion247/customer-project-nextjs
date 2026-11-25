import Link from "next/link";

export default function AU() {
  return (
    <section id="about" className="bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-my-font text-4xl font-semibold tracking-tight">
          Meist
        </h2>
        <p className="mt-6 text-lg leading-8">
          Kalmuhooldus OÜ alustas tegevust 2022. aastal. Meie peamine töö on
          hauaplatside hooldus ja renoveerimine vastavalt klientide soovidele ja
          vajadustele. Lisaks anname nõu ning aitame leida sobivaid lahendusi
          hauaplatsi kujundamisel. Tegutseme peamiselt Lõuna-Eestis, kuid
          suuremate tööde korral pakume teenust üle kogu Eesti.
        </p>
        <Link
          href="/#kontakt"
          className="mt-8 inline-block rounded-full bg-stone-700 px-8 py-3 font-medium text-white transition-colors hover:bg-stone-600"
        >
          Võta meiega ühendust
        </Link>
      </div>
    </section>
  );
}
