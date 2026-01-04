import type { ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

const headingClasses = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-bold",
  h3: "text-2xl font-semibold",
};

export default function Heading({ children, as = "h2", className }: HeadingProps) {
  const Tag = as;
  return (
    <Tag className={`${headingClasses[as]} ${className ?? ""}`.trim()}>
      {children}
    </Tag>
  );
}
