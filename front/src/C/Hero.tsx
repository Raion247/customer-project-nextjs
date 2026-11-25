import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[55vh] items-center overflow-hidden">
      <Image
        src="/flower.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[80%_60%]"
      />
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="max-w-2xl text-white">
          <h1 className="font-my-font text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Kui kalmuplats on sinu jaoks tähtis, vali parim!
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/85">
            Kalmuhooldus OÜ alustas tegevust 2022. aastal ja on
            spetsialiseerunud hauaplatside hooldusele, haljastustöödele ja
            sellega seotud lahenduste pakkumisele, tagades austuse ja ilu
            lähedaste viimasele puhkepaigale.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/#tood"
              className="rounded-full bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-white/85"
            >
              Tehtud tööd
            </Link>
            <Link
              href="/#kontakt"
              className="rounded-full border border-white px-8 py-3 font-medium text-white transition-colors hover:bg-white/15"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
