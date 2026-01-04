import { SITE } from "../../constants/site";
import Heading from "../components/ui/Heading";

export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <Heading as="h1" className="text-3xl font-bold mb-4">
        About
      </Heading>
      <p className="text-lg text-gray-600 mb-4">
        I'm a frontend engineer focused on building reliable, maintainable interfaces and developer
        tools. I enjoy teaching and writing about architecture, tradeoffs, and pragmatic
        engineering.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Frontend engineer at ING Germany. Based in Germany — German: intermediate and improving.
      </p>
      <Heading as="h2" className="text-xl font-semibold mt-6 mb-2">
        What I do
      </Heading>
      <ul className="list-disc list-inside mb-4">
        <li>Designing component systems and design tokens</li>
        <li>Building production React apps with Next.js and TypeScript</li>
        <li>Performance and observability for frontends</li>
        <li>Also experienced building apps with Angular, Vue, and lit-element</li>
      </ul>
      <Heading as="h2" className="text-xl font-semibold mt-6 mb-2">
        Contact
      </Heading>
      <p className="mb-2">
        You can find me on{" "}
        <a className="text-blue-500" href="https://github.com/alirezajs">
          GitHub
        </a>{" "}
        and{" "}
        <a className="text-blue-500" href="https://www.linkedin.com/in/alireza-varmaghani/">
          LinkedIn
        </a>
        . I also write on{" "}
        <a className="text-blue-500" href={SITE.mediumUrl}>
          Medium
        </a>
        .
      </p>
    </main>
  );
}
