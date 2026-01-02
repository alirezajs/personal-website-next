import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "../../../lib/articles";
import CodeCopyClient from "../CodeCopyClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const siteUrl = "https://alireza.dev";
  const url = `${siteUrl}/blog/${article.slug}`;
  const ogImage = article.coverImage || "/og-image.png";

  return {
    title: `${article.title} — Alireza Varmaghani`,
    description: article.summary,
    alternates: {
      canonical: url,
    },
    keywords: article.tags,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date || undefined,
    dateModified: article.date || undefined,
    author: {
      "@type": "Person",
      name: "Alireza Varmaghani",
    },
    image: article.coverImage
      ? [`https://alireza.dev${article.coverImage}`]
      : undefined,
    mainEntityOfPage: `https://alireza.dev/blog/${article.slug}`,
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <CodeCopyClient />
      <header className="mb-8">
        {article.coverImage && (
          <figure className="mb-6">
            <Image
              className="w-full rounded-xl border border-gray-200"
              src={article.coverImage}
              alt=""
              width={1600}
              height={900}
            />
          </figure>
        )}
        <div className="flex items-center gap-3 mb-3">
          <Image
            className="h-10 w-10 rounded-full border border-gray-200 object-cover"
            src="/images/owner.png"
            alt="Alireza Varmaghani"
            width={40}
            height={40}
          />
          <div>
            <p className="text-sm text-gray-700">Alireza Varmaghani</p>
            {article.date && <p className="text-xs text-gray-500">{article.date}</p>}
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
        {article.summary && <p className="text-gray-600 mt-3">{article.summary}</p>}
        <a
          className="text-sm text-gray-700 hover:text-blue-600 mt-4 inline-block"
          href="https://medium.com/@alireza.varmaghani"
        >
          Read on Medium for extra courage
        </a>
      </header>
      <article
        className="article-content text-gray-700"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />
      <footer className="mt-10 border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500">Written by alireza.varmghatni</p>
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-600 bg-gray-100 border border-gray-200 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4">
          <a
            className="text-sm text-gray-700 hover:text-blue-600"
            href="https://medium.com/@alireza.varmaghani/react-performance-prefer-component-composition-over-memoization-1b8ad4d12464"
          >
            Clap or comment on Medium
          </a>
        </div>
      </footer>
    </main>
  );
}
