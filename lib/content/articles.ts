// Loads and renders markdown articles from the content directory.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Article, ArticleContent } from "../../types/article";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

// Normalizes frontmatter "hidden" into a boolean.
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

// URL-encodes text for safe embedding in HTML attributes.
function encodeForAttribute(value: string) {
  return encodeURIComponent(value);
}

// Escapes HTML entities to render code safely.
function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Converts markdown to HTML and injects copy buttons into code blocks.
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

// Lists markdown files in the articles directory.
function getMarkdownFiles() {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs.readdirSync(articlesDirectory).filter((file) => file.endsWith(".md"));
}

// Returns all visible articles sorted by date (newest first).
// Warns in dev when frontmatter fields have unexpected types.
function warnInvalidField(slug: string, field: string, expected: string, actual: unknown) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const actualType = actual === null ? "null" : typeof actual;
  console.warn(
    `[content] ${slug}: expected "${field}" to be ${expected}, got ${actualType}.`,
  );
}

function getStringField(
  slug: string,
  data: Record<string, unknown>,
  field: string,
  fallback = "",
) {
  const value = data[field];
  if (typeof value === "string") {
    return value;
  }
  if (value == null) {
    return fallback;
  }
  warnInvalidField(slug, field, "string", value);
  return String(value);
}

function getOptionalStringField(
  slug: string,
  data: Record<string, unknown>,
  field: string,
) {
  const value = data[field];
  if (value == null || value === "") {
    return undefined;
  }
  if (typeof value === "string") {
    return value;
  }
  warnInvalidField(slug, field, "string", value);
  return String(value);
}

function getTagsField(slug: string, data: Record<string, unknown>) {
  const value = data.tags;
  if (value == null) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value.map(String);
  }
  if (typeof value === "string") {
    return [value];
  }
  warnInvalidField(slug, "tags", "string[]", value);
  return undefined;
}

function extractFrontmatter(slug: string, data: Record<string, unknown>) {
  return {
    title: getStringField(slug, data, "title", slug),
    date: getStringField(slug, data, "date", ""),
    summary: getOptionalStringField(slug, data, "summary"),
    coverImage: getOptionalStringField(slug, data, "coverImage"),
    tags: getTagsField(slug, data),
    hidden: isHidden(data.hidden),
  };
}

export function getAllArticles(): Article[] {
  return getMarkdownFiles()
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const { title, date, summary, coverImage, tags, hidden } = extractFrontmatter(
        slug,
        data,
      );

      return {
        slug,
        title,
        date,
        summary,
        coverImage,
        tags,
        hidden,
      };
    })
    .filter((article) => !article.hidden)
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;
      return bTime - aTime;
    });
}

// Returns the latest N visible articles.
export function getLatestArticles(limit = 4): Article[] {
  return getAllArticles().slice(0, limit);
}

// Loads a single article by slug and renders its HTML content.
export function getArticleBySlug(slug: string): ArticleContent | null {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const { title, date, summary, coverImage, tags, hidden } = extractFrontmatter(slug, data);

  if (hidden) {
    return null;
  }

  return {
    slug,
    title,
    date,
    summary,
    coverImage,
    tags,
    hidden,
    contentHtml: renderMarkdown(content),
  };
}
