import { LATEST } from "../lib/projects";
import { LATEST_ESSAYS } from "../lib/essays";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-3">Alireza Varmaghani</h1>
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
      </section>

      {LATEST.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Latest Projects</h2>
          <div className="grid space-y-3 gap-4">
            {LATEST.map((p) => (
              <article key={p.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{p.title}</h3>
                    {p.company && <p className="text-xs text-gray-500 mb-2">{p.company}</p>}
                    <p className="text-sm text-gray-600">{p.description}</p>
                  </div>
                  <a className="text-blue-500 text-sm whitespace-nowrap mt-1" href={p.link}>
                    Link To Doc
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {LATEST_ESSAYS.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-3">Latest Essays</h2>
          <ul className="list-disc list-inside mb-6">
            {LATEST_ESSAYS.map((e) => (
              <li key={e.slug}>
                <a className="text-blue-500" href={`/blog/${e.slug}`}>
                  {e.title}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex gap-4">
            <a className="text-sm text-gray-700 hover:text-blue-600" href="/blog">
              Read all essays
            </a>
            <a
              className="text-sm text-gray-700 hover:text-blue-600"
              href="https://github.com/alirezajs"
            >
              GitHub
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
