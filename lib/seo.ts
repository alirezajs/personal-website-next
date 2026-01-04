import type { Metadata } from "next";
import { SITE } from "../constants/site";

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
};

function resolveUrl(path?: string) {
  if (!path) {
    return SITE.url;
  }
  if (path.startsWith("http")) {
    return path;
  }
  return `${SITE.url}${path}`;
}

function resolveImage(image?: string) {
  const value = image || SITE.defaultOgImage;
  if (value.startsWith("http")) {
    return value;
  }
  return `${SITE.url}${value}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
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
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
