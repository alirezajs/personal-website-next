import { SITE } from "../../constants/site";
import Heading from "../components/ui/Heading";

export default function Imprint() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <Heading as="h1" className="text-3xl font-bold mb-4">
        Imprint (Impressum)
      </Heading>
      
      <Heading as="h2" className="text-xl font-semibold mt-6 mb-2">
        Information according to § 5 TMG
      </Heading>
      <p className="mb-2">
        {SITE.name}<br />
        {SITE.location.city}<br />
        {SITE.location.country}
      </p>

      <Heading as="h2" className="text-xl font-semibold mt-6 mb-2">
        Contact
      </Heading>
      <p className="mb-2">
        Email:{" "}
        <a className="text-blue-500" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
      </p>

      <Heading as="h2" className="text-xl font-semibold mt-6 mb-2">
        Responsible for content
      </Heading>
      <p className="text-gray-600 mb-4">{SITE.name}</p>

      <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
    </main>
  );
}
