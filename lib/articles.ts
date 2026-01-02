import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type Article = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  coverImage?: string;
  tags?: string[];
};

type ArticleContent = Article & {
  contentHtml: string;
};

const articlesDirectory = path.join(process.cwd(), "content", "articles");

function encodeForAttribute(value: string) {
  return encodeURIComponent(value);
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderMarkdown(markdown: string) {
  const renderer = new marked.Renderer();

  renderer.code = (code, infostring) => {
    const codeText = typeof code === "string" ? code : code?.text || "";
    const lang = (infostring || "").trim();
    const languageClass = lang ? ` class="language-${escapeHtml(lang)}"` : "";
    const encoded = encodeForAttribute(codeText);

    return [
      `<div class="code-block">`,
      `<button type="button" class="code-copy" data-code="${encoded}">Copy</button>`,
      `<pre><code${languageClass}>${escapeHtml(codeText)}</code></pre>`,
      `</div>`,
    ].join("");
  };

  return marked.parse(markdown, { renderer });
}

function getMarkdownFiles() {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs.readdirSync(articlesDirectory).filter((file) => file.endsWith(".md"));
}

export function getAllArticles(): Article[] {
  return getMarkdownFiles()
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: String(data.title || slug),
        date: String(data.date || ""),
        summary: data.summary ? String(data.summary) : undefined,
        coverImage: data.coverImage ? String(data.coverImage) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      };
    })
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;
      return bTime - aTime;
    });
}

export function getLatestArticles(limit = 4): Article[] {
  return getAllArticles().slice(0, limit);
}

export function getArticleBySlug(slug: string): ArticleContent | null {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: String(data.title || slug),
    date: String(data.date || ""),
    summary: data.summary ? String(data.summary) : undefined,
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    contentHtml: renderMarkdown(content),
  };
}
