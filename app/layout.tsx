import type { Metadata } from "next"
import { Geist, Azeret_Mono } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const azeretMono = Azeret_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://subhajit-chatterjee.vercel.app'),
  title: {
    default: "Subhajit Chatterjee | AI Engineer & Full-Stack Developer",
    template: "%s | Subhajit Chatterjee"
  },
  description: "Building intelligent systems with AI and scalable web technologies. Specialized in LLMs, RAG, and Modern Frontend.",
  keywords: ["Subhajit Chatterjee", "AI Engineer", "Full-Stack Developer", "Next.js", "ML Developer", "Portfolio", "UI/UX Design"],
  authors: [{ name: "Subhajit Chatterjee" }],
  creator: "Subhajit Chatterjee",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://subhajit-chatterjee.vercel.app",
    title: "Subhajit Chatterjee | AI Engineer & Full-Stack Developer",
    description: "Building intelligent systems with AI and scalable web technologies. Specialized in LLMs, RAG, and Modern Frontend.",
    siteName: "Subhajit Chatterjee Portfolio",
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: "Subhajit Chatterjee Portfolio Cover"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhajit Chatterjee | AI Engineer & Full-Stack Developer",
    description: "Building intelligent systems with AI and scalable web technologies. Specialized in LLMs, RAG, and Modern Frontend.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

import CustomCursor from "@/components/CustomCursor"
import WorkLight from "@/components/WorkLight"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geist.variable} ${azeretMono.variable} antialiased selection:bg-white/20 cursor-none`} suppressHydrationWarning>
        <CustomCursor />
        <WorkLight />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
