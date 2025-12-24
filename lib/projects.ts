export type Project = {
  id: string;
  title: string;
  description: string;
  tech?: string[];
  linkTORepo?: string;
  link: string;
  company?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "ing-business-account",
    title: "ING Business Account",
    company: "ING Germany",
    description:
      "Business account management platform at ING Germany. A comprehensive frontend solution for managing business banking accounts and transactions.",
    tech: ["javascript", "TypeScript", "lit-element", "ING ecosystem"],
    link: "https://www.ing.de/business/geschaeftskonto/",
  },
  {
    id: "ing-business-loan",
    title: "ING Business Loan Onboarding",
    company: "ING Germany",
    description:
      "Digital onboarding platform for business loan applications at ING Germany. A modern frontend solution enabling seamless loan application processes.",
    tech: ["javascript", "TypeScript", "lit-element", "ING ecosystem"],
    link: "https://www.ing.de/business/kredit/",
  },
  {
    id: "ing-business-extra-account",
    title: "ING Business Extra Account",
    company: "ING Germany",
    description:
      "Flexible savings and investment account solution for businesses at ING Germany. A modern frontend enabling efficient management of business savings and financial planning.",
    tech: ["javascript", "TypeScript", "lit-element", "ING ecosystem"],
    link: "https://www.ing.de/business/extra-konto/",
  },
  {
    id: "storlogix-cloud",
    title: "StorLogix Cloud Platform",
    company: "Limestone Digital",
    description:
      "Comprehensive cloud solution for self-storage businesses combining StorLogix Cloud, EasyCode, and StorLogix Mobile. Built on 40 years of industry experience with the latest technology to help operators streamline operations, minimize risk, and improve their bottom line.",
    tech: ["Angular", "TypeScript", "Javascript", "Sass", "RxJS", "NgRx"],
    link: "https://www.ptisecurity.com/us/en/products/access-control/storlogix-cloud",
  },
  {
    id: "bimeh-platform",
    title: "Bimeh Platform",
    company: "Bimeh.com",
    description:
      "Insurance platform providing comprehensive coverage and policy management solutions. A modern frontend enabling seamless insurance application and policy administration.",
    tech: ["React", "TypeScript", "Next.js"],
    link: "https://bimeh.com/",
  },
];

export const LATEST = PROJECTS.slice(0, 3);
