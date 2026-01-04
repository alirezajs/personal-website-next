import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
};

export default function Section({ children, className, as = "section" }: SectionProps) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
