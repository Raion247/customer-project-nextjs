import type { Metadata } from "next";
import AU from "@/C/AU";
import CS from "@/C/CS";
import CT from "@/C/CT";
import CW from "@/C/CW";
import F from "@/C/F";
import H from "@/C/H";
import Hero from "@/C/Hero";
import W from "@/C/W";

export const metadata: Metadata = {
  title: "Hauahooldus ja kalmuhooldus Tartu",
  description:
    "Kalmuhooldus OÜ hooldab hauaplatsi Tartus ja Tartumaal: puhastus, istutus, piirded ja hooajaline korrastus. Küsi hinnapakkumist.",
  alternates: { canonical: "/" },
};

function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Kalmuhooldus",
      url: "https://example.com",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Kalmuhooldus OÜ",
      url: "https://example.com",
      telephone: "+372 5555 5555",
      email: "info@example.com",
      areaServed: "Tartu",
      description: "Haudade hooldus, puhastus ja istutus.",
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <H />
      <main>
        <JsonLd />
        <Hero />
        <AU />
        <W />
        <CW />
        <CS />
        <CT />
      </main>
      <F />
    </>
  );
}
