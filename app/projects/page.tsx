import ProjectList from "../components/ProjectList";
import Page from "../components/ui/Page";
import { PROJECTS } from "../../lib/content/projects";

export default function Projects() {
  return (
    <Page size="wide">
      <ProjectList
        projects={PROJECTS}
        title="Projects"
        description="A selection of projects, experiments, and OSS I contribute to."
      />
    </Page>
  );
}
