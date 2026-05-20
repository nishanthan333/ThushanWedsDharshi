import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Thushan & Dharshi | Hindu Wedding 2026",
  description: "Join us as we celebrate the sacred union of Thushan and Dharshi on July 1st, 2026.",
  openGraph: {
    title: "Thushan & Dharshi | Hindu Wedding 2026",
    description: "Hindu Ceremony · July 1st 2026 | Reception · July 3rd 2026",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
