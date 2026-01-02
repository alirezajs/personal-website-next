import type { Metadata } from "next";
import { getAllArticles } from "../../lib/articles";

export const metadata: Metadata = {
  title: "Articles — Alireza Varmaghani",
  description: "Notes about frontend architecture, product thinking, and engineering.",
  alternates: {
    canonical: "https://alireza.dev/blog",
  },
  openGraph: {
    title: "Articles — Alireza Varmaghani",
    description: "Notes about frontend architecture, product thinking, and engineering.",
    url: "https://alireza.dev/blog",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Articles — Alireza Varmaghani",
    description: "Notes about frontend architecture, product thinking, and engineering.",
  },
};

export default function Blog() {
  const articles = getAllArticles();
  const articleListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Articles",
    url: "https://alireza.dev/blog",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://alireza.dev/blog/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleListJsonLd) }}
      />
      <h1 className="text-3xl font-bold mb-6">Articles</h1>

      {articles.length === 0 ? (
        <div>
          <p className="text-gray-600 mb-4">No articles published yet. Check back later!</p>
          <a
            className="text-sm text-gray-700 hover:text-blue-600"
            href="https://medium.com/@alireza.varmaghani"
          >
            Read on Medium for extra courage
          </a>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            Notes about frontend architecture and building products.
          </p>
          <ul className="list-disc list-inside">
            {articles.map((article) => (
              <li key={article.slug} className="mb-2">
                <a className="text-blue-500" href={`/blog/${article.slug}`}>
                  {article.title}
                </a>
                {article.date && <span className="text-xs text-gray-500 ml-2">{article.date}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <a
              className="text-sm text-gray-700 hover:text-blue-600"
              href="https://medium.com/@alireza.varmaghani"
            >
              Read on Medium for extra courage
            </a>
          </div>
        </>
      )}
    </main>
  );
}
