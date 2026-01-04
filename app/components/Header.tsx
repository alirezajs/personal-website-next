import Link from "next/link";
import { SITE } from "../../constants/site";

type HeaderProps = {
  hasArticles: boolean;
  hasProjects: boolean;
};

export default function Header({ hasArticles, hasProjects }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          {SITE.shortName}
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {hasArticles && (
            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Articles
            </Link>
          )}
          {hasProjects && (
            <Link href="/projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Projects
            </Link>
          )}
          <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
