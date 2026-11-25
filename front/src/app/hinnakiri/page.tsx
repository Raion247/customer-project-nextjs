import type { Metadata } from "next";
import F from "@/C/F";
import H from "@/C/H";
import PL from "@/C/PL";

export const metadata: Metadata = {
  title: "Hinnakiri",
  description:
    "Hauahoolduse ja kalmuhoolduse hinnad: puhastus, istutus, hooldus. Vaata hinnakirja ja küsi pakkumist.",
  alternates: { canonical: "/hinnakiri" },
};

export default function Hinnakiri() {
  return (
    <>
      <H />
      <main>
        <PL />
      </main>
      <F />
    </>
  );
}
