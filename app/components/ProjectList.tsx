import type { Project } from "../../types/project";
import Card from "./ui/Card";
import Heading from "./ui/Heading";

type ProjectListProps = {
  projects: Project[];
  title?: string;
  description?: string;
  emptyMessage?: string;
  titleClassName?: string;
};

export default function ProjectList({
  projects,
  title = "Projects",
  description,
  emptyMessage = "No projects added yet. Check back soon!",
  titleClassName,
}: ProjectListProps) {
  return (
    <>
      {title && (
        <Heading as="h2" className={titleClassName ?? "mb-6"}>
          {title}
        </Heading>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-slate-200">{emptyMessage}</p>
        </div>
      ) : (
        <>
          {description && (
            <p className="text-gray-600 dark:text-slate-200 mb-6">{description}</p>
          )}

          <div className="grid space-y-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} as="article" className="p-4">
                <h3 className="font-medium mb-1">{project.title}</h3>
                {project.company && (
                  <p className="text-xs text-gray-500 dark:text-slate-300 mb-2">
                    {project.company}
                  </p>
                )}
                <p className="text-sm text-gray-600 dark:text-slate-200 mb-3">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 dark:text-slate-300">
                    {project.tech?.join(" • ")}
                  </div>
                  {project.link ? (
                    <a
                      className="text-blue-500 dark:text-blue-300 text-sm"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link To Doc
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400 dark:text-slate-400">
                      Private / internal
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
}
