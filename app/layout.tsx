import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import BackgroundScene from "@/components/BackgroundScene"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Subhajit Chatterjee | AI Engineer & Full-Stack Developer",
  description: "Building intelligent systems with AI and scalable web technologies. Specialized in LLMs, RAG, and Modern Frontend.",
  keywords: ["Subhajit Chatterjee", "AI Engineer", "Full-Stack Developer", "Next.js", "ML Developer", "Portfolio"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-indigo-500/30`}>
        <BackgroundScene />
        {children}
      </body>
    </html>
  )
}
