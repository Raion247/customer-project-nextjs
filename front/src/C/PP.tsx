import type { ReactNode } from "react";
import { CR } from "@/C/CB";

const SITE = "https://example.com";
const EMAIL = "info@example.com";

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="underline hover:text-black">
      {children}
    </a>
  );
}

function Site() {
  return <A href={SITE}>{SITE}</A>;
}

export default function PP() {
  return (
    <section className="bg-white text-stone-700">
      <div className="mx-auto max-w-6xl space-y-5 px-6 py-16 leading-7">
        <h1 className="font-my-font text-4xl font-bold tracking-tight text-stone-900">
          Privaatsustingimused
        </h1>

        <p>
          Käesolevad andmete töötlemise põhimõtted on kehtivad meie (<Site />)
          veebilehe kasutajatele ja veebisaidil esitletud teenuste kasutajatele.
        </p>

        <p>
          Käesolev veebileht <Site /> kuulub KALMUHOOLDUS OÜ-le (registrikood
          00000000). Me töötleme isikuandmeid vastavalt EV Andmekaitse
          Inspektsiooni ja Euroopa Parlamendi ja Nõukogu Määrusele (EL) 2016/679
          ning kogume veebilehe kasutajate andmeid turunduslikul eesmärgil.
          Edastame Teiega seotud andmed kolmandatele osapooltele vaid seaduses
          sätestatud juhtudel.
        </p>

        <h2 className="pt-2 font-bold text-stone-900">
          Andmete kogumine, töötlemine ja kasutamine
        </h2>

        <p>
          Kogume isikute kontaktandmeid meie poolt pakutavate teenuste ja
          toodete osas päringute tegemisel, teenuste broneerimisel ja
          kasutamisel. Kasutame saadud andmeid teenusest huvitatud isikutega
          kontakteerumiseks, teenuse osutamiseks kehtivates õigusaktides
          sätestatud korras. Lisaks kasutame kogutud andmeid teenuse
          arendamiseks ja raamatupidamise aruandluse korraldamiseks. Lisaks
          kasutame klientidega suhtluse ning teenuse osutamise käigus kogutud
          teavet ka statistilistel eesmärkidel.
        </p>

        <p>
          Kogutud isikuandmete säilitamise periood sõltub andmetöötluse
          eesmärgist. Andmeid säilitatakse nii kaua, kui see on kavandatud
          eesmärgi saavutamiseks vajalik. Säilitame isikute kohta kogutud
          andmeid kehtivatest õigusaktidest tulenevate nõuete aegumiseni või
          õigusaktidest tulenevate dokumentide säilitustähtaja saabumiseni
          vastavalt käibemaksu- ja raamatupidamise seadusele kuni 7 aastat.
          Andmete töötlemisel kasutame vajalikke turvameetmeid, et andmeid
          saaksid käidelda vaid selleks volitatud isikud.
        </p>

        <h2 className="pt-2 font-bold text-stone-900">
          Küpsised / Cookie’d / pluginad
        </h2>

        <p>
          Kasutame tehniliselt vajalikke küpsiseid, mis tagavad veebilehe
          toimimise ja turvalisuse (õiguslik alus: õigustatud huvi, üldmääruse
          art 6 lg 1 p f). Lisaks kasutame Google Analyticsit (Google Ireland
          Limited), et näha statistikat veebilehe kasutamise kohta: külastatud
          lehed, seadme tüüp ja ligikaudne asukoht. Analüütika küpsised ja
          skriptid laetakse ainult siis, kui olete nupule “Nõustun” vajutanud
          (õiguslik alus: nõusolek, art 6 lg 1 p a). Andmeid võidakse edastada
          väljapoole Euroopa Majanduspiirkonda Euroopa Komisjoni heaks kiidetud
          kaitsemeetmete alusel.
        </p>

        <p>
          Nõusoleku saate igal ajal tagasi võtta: <CR />. Küpsiseid saate
          kustutada ka oma brauseri seadetes.
        </p>

        <h2 className="pt-2 font-bold text-stone-900">
          Kasutaja õigused seoses meie poolt kogutud andmetega
        </h2>

        <p>
          Kasutajal on õigus saada enda kohta teavet kogutud isikustatud andmete
          kasutamise kohta vastavalt kehtivates õigusaktides sätestatud korrale.
          Andmete töötlemist, edastamist ja säilitamist reguleerivad vastava
          seaduse sätted. Euroopa Parlamendi ja Nõukogu määrus (EL) 2016/679,
          millega kehtestati ühtne andmekaitseraamistik kogu Euroopa Liidus.
        </p>

        <p>
          Kasutajatel on eelnimetatud tegevustest alati õigus keelduda, enne kui
          andmeid rendifirmas loetakse. Kasutajal on ka õigus nõustuda või siis
          keelata oma isikuandmete kasutamine turunduslikel eesmärkidel. Teil on
          õigus mitte lubada oma andmeid töödelda, kui teie andmeid kasutatakse
          otseturunduse eesmärgil. Kui te ei luba oma andmeid töödelda, palun
          andke meile teada oma keeldumise põhjus.
        </p>

        <p>
          Kasutajal on igal ajahetkel õigus loobuda isikustatud turunduslike
          teadete saamisest. Õigus nõusoleku tagasivõtmisele - Kui andmete
          töötlemine põhineb nõusolekul, on teil õigus oma nõusolek andmete
          töötlemiseks tagasi võtta mis tahes hetkel ja tasuta.
        </p>

        <h2 className="pt-2 font-bold text-stone-900">
          Õigus esitada kaebus või vastuväiteid
        </h2>

        <p>
          Kui olete arvamusel, et me ei ole järginud teie andmete töötlemisel
          andmekaitse-eeskirjade sätteid, võite esitada kaebuse oma isikuandmete
          töötlemise kohta isikuandmete kaitsega tegelevale
          järelevalveasutusele, kelle ees me kanname vastutust.
        </p>

        <p>
          Kõikide isikuandmeid puudutavate küsimuste korral palume pöörduda meie
          poole kirjalikult e-posti teel <A href={`mailto:${EMAIL}`}>{EMAIL}</A>
        </p>

        <p>
          KALMUHOOLDUS OÜ jätab endale õiguse käesolevaid andmete töötlemise
          põhimõtteid muuta ilma etteteatamiseta, mille kohta avaldame vastava
          info meie veebilehel <Site />.
        </p>
      </div>
    </section>
  );
}
