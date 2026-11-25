import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CB from "@/C/CB";
import localFont from "next/font/local";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const myFont = localFont({
  src: "../font/Greengoth Expanded.ttf",
  variable: "--font-my-font",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Hauahooldus ja kalmuhooldus Tartu | Kalmuhooldus",
    template: "%s | Kalmuhooldus",
  },
  description:
    "Hauaplatside, hauapiirete ja haudade hooldus Tartus ja Tartumaal. Puhastus, istutus ja korrastus. Vaata hinnakirja ja küsi pakkumist.",
  openGraph: {
    siteName: "Kalmuhooldus",
    locale: "et_EE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="et"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${myFont.variable} h-full scroll-pt-16 antialiased motion-safe:scroll-smooth md:scroll-pt-30`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CB />
      </body>
    </html>
  );
}
