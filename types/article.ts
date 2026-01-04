export type Article = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  coverImage?: string;
  tags?: string[];
  hidden?: boolean;
};

export type ArticleContent = Article & {
  contentHtml: string;
};
