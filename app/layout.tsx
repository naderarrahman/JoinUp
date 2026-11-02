import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/layout/Navbar"
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/layout/Footer"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" })

export const metadata: Metadata = {
  title: {
    default: "JoinUs - Social Development Events Platform",
    template: "%s | JoinUs"
  },
  description: "Discover, create, and join social service events around you. From winter clothes distribution to plantation drives, be the change you want to see in your community.",
  authors: [{ name: "Nader Ar Rahman" }],
  openGraph: {
    type: "website",
    url: "https://join-up-sigma.vercel.app",
    title: "JoinUs - Social Development Events Platform",
    description: "Discover, create, and join social service events around you. Be the change you want to see in your community.",
    siteName: "JoinUs",
    images: [
      {
        url: "https://join-up-sigma.vercel.app/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "JoinUs Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JoinUs - Social Development Events Platform",
    description: "Discover, create, and join social service events around you.",
    images: ["https://join-up-sigma.vercel.app/logo/logo.png"],
    creator: "@naderArRahman03",
  },
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased font-sans", inter.variable, plusJakarta.variable)}
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}