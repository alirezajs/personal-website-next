import { getAllArticles } from "../../lib/content/articles";
import { SITE } from "../../constants/site";
import { buildPageMetadata } from "../../lib/seo";
import ArticleList from "../components/ArticleList";

export const metadata = buildPageMetadata({
  title: `Articles — ${SITE.name}`,
  description: "Notes about frontend architecture, product thinking, and engineering.",
  path: "/blog",
});

export default function Blog() {
  const articles = getAllArticles();
  const articleListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Articles",
    url: `${SITE.url}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE.url}/blog/${article.slug}`,
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
      <ArticleList
        articles={articles}
        title="Articles"
        description="Notes about frontend architecture and building products."
        showDate
      />
      <div className="mt-6">
        <a className="text-sm text-gray-700 hover:text-blue-600" href={SITE.mediumUrl}>
          Read on Medium for extra courage
        </a>
      </div>
    </main>
  );
}
