import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subhajit Chatterjee | AI/ML Engineer & Frontend Developer",
  description: "Impact-driven portfolio of Subhajit Chatterjee. Specialized in RAG, LLM Query Systems, and high-performance Web Architectures.",
  keywords: ["Subhajit Chatterjee", "AI Portfolio", "ML Developer", "Frontend Developer", "Next.js", "Python AI", "Brainware University"],
  authors: [{ name: "Subhajit Chatterjee" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-neon/40 selection:text-black">
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
