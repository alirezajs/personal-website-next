import type { Metadata } from "next";
import { SITE } from "../constants/site";

// Builds consistent metadata for pages (canonical URL, OpenGraph, Twitter).

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  twitterCard?: "summary" | "summary_large_image";
  twitterSite?: string;
  siteName?: string;
};

// Resolves a path to an absolute site URL.
function resolveUrl(path?: string) {
  if (!path) {
    return SITE.url;
  }
  if (path.startsWith("http")) {
    return path;
  }
  return `${SITE.url}${path}`;
}

// Resolves an image path to an absolute OpenGraph URL.
function resolveImage(image?: string) {
  const value = image || SITE.defaultOgImage;
  if (value.startsWith("http")) {
    return value;
  }
  return `${SITE.url}${value}`;
}

// Builds a Metadata object for Next.js pages.
export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
  twitterCard = "summary_large_image",
  twitterSite = SITE.twitterHandle,
  siteName = SITE.name,
}: PageMetadataOptions): Metadata {
  const url = resolveUrl(path);
  const ogImage = resolveImage(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      site: twitterSite,
      title,
      description,
      images: [ogImage],
    },
  };
}
