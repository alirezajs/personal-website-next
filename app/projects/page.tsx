import { PROJECTS } from "../../lib/projects";

export default function Projects() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      {PROJECTS.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No projects added yet. Check back soon!</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            A selection of projects, experiments, and OSS I contribute to.
          </p>

          <div className="grid space-y-3 gap-6">
            {PROJECTS.map((p) => (
              <article key={p.id} className="p-4 border rounded-lg">
                <h2 className="font-medium mb-1">{p.title}</h2>
                {p.company && <p className="text-xs text-gray-500 mb-2">{p.company}</p>}
                <p className="text-sm text-gray-600 mb-3">{p.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">{p.tech?.join(" • ")}</div>
                  {p.link ? (
                    <a
                      className="text-blue-500 text-sm"
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link To Doc
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400">Private / internal</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
