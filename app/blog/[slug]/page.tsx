import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "../../../lib/content/articles";
import { SITE } from "../../../constants/site";
import { buildPageMetadata } from "../../../lib/seo";
import CodeCopyClient from "../../components/CodeCopyClient";
import Heading from "../../components/ui/Heading";

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

  return buildPageMetadata({
    title: `${article.title} — ${SITE.name}`,
    description: article.summary,
    path: `/blog/${article.slug}`,
    image: article.coverImage,
    type: "article",
    keywords: article.tags,
  });
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
      name: SITE.name,
    },
    image: article.coverImage
      ? [`${SITE.url}${article.coverImage}`]
      : undefined,
    mainEntityOfPage: `${SITE.url}/blog/${article.slug}`,
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
            src={SITE.avatarImage}
            alt={SITE.name}
            width={40}
            height={40}
          />
          <div>
            <p className="text-sm text-gray-700">{SITE.name}</p>
            {article.date && <p className="text-xs text-gray-500">{article.date}</p>}
          </div>
        </div>
        <Heading as="h1" className="text-3xl font-bold mb-2">
          {article.title}
        </Heading>
        {article.summary && <p className="text-gray-600 mt-3">{article.summary}</p>}
        <a
          className="text-sm text-gray-700 hover:text-blue-600 mt-4 inline-block"
          href={SITE.mediumUrl}
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
