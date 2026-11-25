import type { Metadata } from "next";
import F from "@/C/F";
import H from "@/C/H";
import PP from "@/C/PP";

export const metadata: Metadata = {
  title: "Privaatsustingimused",
  robots: { index: false },
};

export default function Privaatsus() {
  return (
    <>
      <H />
      <main>
        <PP />
      </main>
      <F />
    </>
  );
}
