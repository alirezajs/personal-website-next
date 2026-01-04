import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LATEST } from "../lib/content/projects";
import { getAllArticles } from "../lib/content/articles";
import { SITE } from "../constants/site";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
  title: SITE.title,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  twitter: {
    card: "summary_large_image",
    site: SITE.twitterHandle,
  },
  openGraph: {
    title: SITE.title,
    description: "Projects, writing, and experiments about frontend architecture and engineering.",
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: `${SITE.url}${SITE.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: SITE.name,
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
  const articles = getAllArticles();
  const hasArticles = articles.length > 0;
  const hasProjects = LATEST.length > 0;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header hasArticles={hasArticles} hasProjects={hasProjects} />

        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
