import type { Article } from "../../types/article";
import Heading from "./ui/Heading";

type ArticleListProps = {
  articles: Article[];
  title?: string;
  description?: string;
  emptyMessage?: string;
  showDate?: boolean;
  titleClassName?: string;
};

export default function ArticleList({
  articles,
  title = "Articles",
  description,
  emptyMessage = "No articles published yet. Check back later!",
  showDate = false,
  titleClassName,
}: ArticleListProps) {
  return (
    <>
      {title && (
        <Heading as="h2" className={titleClassName ?? "mb-6"}>
          {title}
        </Heading>
      )}

      {articles.length === 0 ? (
        <div>
          <p className="text-gray-600 mb-4">{emptyMessage}</p>
        </div>
      ) : (
        <>
          {description && <p className="text-gray-600 mb-6">{description}</p>}
          <ul className="list-disc list-inside">
            {articles.map((article) => (
              <li key={article.slug} className="mb-2">
                <a className="text-blue-500" href={`/blog/${article.slug}`}>
                  {article.title}
                </a>
                {showDate && article.date && (
                  <span className="text-xs text-gray-500 ml-2">{article.date}</span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
