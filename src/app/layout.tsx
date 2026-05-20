import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thushan & Dharshi | Hindu Wedding 2026",
  description: "Join us as we celebrate the sacred union of Thushan and Dharshi — Hindu Ceremony 1st July 2026 · Reception 3rd July 2026.",
  openGraph: {
    title: "Thushan & Dharshi | Hindu Wedding 2026",
    description: "Hindu Ceremony · 1st July 2026 | Reception · 3rd July 2026",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${greatVibes.variable} ${lato.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
