import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { LATEST } from "../lib/projects";
import { LATEST_ESSAYS } from "../lib/essays";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alireza Varmaghani — Frontend Engineer",
  description: "Frontend engineer. Projects, writing, and experiments.",
  metadataBase: new URL("https://alireza.dev"),
  twitter: {
    card: "summary_large_image",
    site: "@alirezajs",
  },
  openGraph: {
    title: "Alireza Varmaghani — Frontend Engineer",
    description: "Projects, writing, and experiments about frontend architecture and engineering.",
    url: "https://alireza.dev",
    siteName: "Alireza Varmaghani",
    images: [
      {
        url: "https://alireza.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alireza Varmaghani",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg">
              Alireza
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              {LATEST_ESSAYS.length > 0 && (
                <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  Essays
                </Link>
              )}
              {LATEST.length > 0 && (
                <Link
                  href="/projects"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                  Projects
                </Link>
              )}
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                About
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>
        <footer className="mt-auto border-t border-gray-100 dark:border-gray-900">
          <div className="max-w-5xl mx-auto px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <p>© {new Date().getFullYear()} Alireza Varmaghani — Built with Next.js</p>
              <div className="flex gap-4">
                <a href="/privacy" className="hover:text-gray-900 dark:hover:text-gray-200">
                  Privacy
                </a>
                <a href="/imprint" className="hover:text-gray-900 dark:hover:text-gray-200">
                  Imprint
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
