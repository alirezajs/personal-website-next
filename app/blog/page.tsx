import { ESSAYS } from "../../lib/essays";

export default function Blog() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Essays</h1>

      {ESSAYS.length === 0 ? (
        <p className="text-gray-600">No essays published yet. Check back later!</p>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            Notes and essays about frontend architecture and building products.
          </p>
          <ul className="list-disc list-inside">
            {ESSAYS.map((p) => (
              <li key={p.slug}>
                <a className="text-blue-500" href={`/blog/${p.slug}`}>
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
