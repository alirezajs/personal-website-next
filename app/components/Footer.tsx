import { SITE } from "../../constants/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center justify-between">
          <p>© {new Date().getFullYear()} {SITE.name} — Built with Next.js</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-gray-900 dark:hover:text-gray-200">
              Privacy
            </a>
            <a href="/imprint" className="hover:text-gray-900 dark:hover:text-gray-200">
              Imprint
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
