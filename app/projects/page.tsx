import ProjectList from "../components/ProjectList";
import { PROJECTS } from "../../lib/content/projects";

export default function Projects() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <ProjectList
        projects={PROJECTS}
        title="Projects"
        description="A selection of projects, experiments, and OSS I contribute to."
      />
    </main>
  );
}
