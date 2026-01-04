import Image from "next/image";
import { LATEST } from "../lib/content/projects";
import { getLatestArticles } from "../lib/content/articles";
import { SITE } from "../constants/site";
import ProjectList from "./components/ProjectList";
import ArticleList from "./components/ArticleList";
import Heading from "./components/ui/Heading";
import Section from "./components/ui/Section";

export default function Home() {
  const latestArticles = getLatestArticles();

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <Section className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <Image
            className="h-16 w-16 rounded-full border border-gray-200 object-cover"
            src={SITE.avatarImage}
            alt={SITE.name}
            width={64}
            height={64}
          />
          <Heading as="h1">{SITE.name}</Heading>
        </div>
        <p className="text-lg text-gray-600 mb-4">
          Frontend engineer, writer, and independent builder.
        </p>
        <p className="text-base mb-6 max-w-2xl">
          I build production-grade JavaScript applications, contribute to open source, and write
          about frontend architecture and real-world tradeoffs. I focus on scalable, maintainable
          systems with React, Next.js, and TypeScript. Learn more{" "}
          <a className="text-blue-500" href="/about">
            about me
          </a>
          .
        </p>
      </Section>

      {LATEST.length > 0 && (
        <Section className="mb-10">
          <ProjectList
            projects={LATEST}
            title="Latest Projects"
            titleClassName="text-2xl font-semibold mb-4"
          />
        </Section>
      )}

      {latestArticles.length > 0 && (
        <Section>
          <ArticleList
            articles={latestArticles}
            title="Latest Articles"
            titleClassName="text-2xl font-semibold mb-3"
          />

          <div className="flex gap-4">
            <a className="text-sm text-gray-700 hover:text-blue-600" href="/blog">
              Read all articles
            </a>
            <a
              className="text-sm text-gray-700 hover:text-blue-600"
              href={SITE.mediumUrl}
            >
              Medium for extra courage
            </a>
            <a
              className="text-sm text-gray-700 hover:text-blue-600"
              href="https://github.com/alirezajs"
            >
              GitHub
            </a>
          </div>
        </Section>
      )}
    </main>
  );
}
