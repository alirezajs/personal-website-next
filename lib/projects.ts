export type Project = {
  id: string;
  title: string;
  description: string;
  tech?: string[];
  link?: string;
};

export const PROJECTS: Project[] = [];

export const LATEST = PROJECTS.slice(0, 3);
