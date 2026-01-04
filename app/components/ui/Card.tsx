import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export default function Card({ children, className, as = "div" }: CardProps) {
  const Tag = as;
  return <Tag className={`border rounded-lg ${className ?? ""}`.trim()}>{children}</Tag>;
}
