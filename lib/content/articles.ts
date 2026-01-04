import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Article, ArticleContent } from "../../types/article";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

function isHidden(value: unknown) {
  if (value === true) {
    return true;
  }
  if (value === false || value == null) {
    return false;
  }
  if (typeof value === "string") {
    return value.trim().toLowerCase() === "true";
  }
  return Boolean(value);
}

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

  renderer.code = ({ text, lang }) => {
    const codeText = text || "";
    const language = (lang || "").trim();
    const languageClass = language ? ` class="language-${escapeHtml(language)}"` : "";
    const encoded = encodeForAttribute(codeText);

    return [
      `<div class="code-block">`,
      `<button type="button" class="code-copy" data-code="${encoded}">Copy</button>`,
      `<pre><code${languageClass}>${escapeHtml(codeText)}</code></pre>`,
      `</div>`,
    ].join("");
  };

  const html = marked.parse(markdown, { renderer, async: false });
  return typeof html === "string" ? html : "";
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
        hidden: isHidden(data.hidden),
      };
    })
    .filter((article) => !article.hidden)
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
  const hidden = isHidden(data.hidden);

  if (hidden) {
    return null;
  }

  return {
    slug,
    title: String(data.title || slug),
    date: String(data.date || ""),
    summary: data.summary ? String(data.summary) : undefined,
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    hidden,
    contentHtml: renderMarkdown(content),
  };
}
