import type { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  size?: "narrow" | "wide";
  className?: string;
  containerClassName?: string;
  as?: "main" | "div" | "section";
};

const sizeClasses = {
  narrow: "max-w-3xl",
  wide: "max-w-5xl",
};

export default function Page({
  children,
  size = "narrow",
  className,
  containerClassName,
  as = "main",
}: PageProps) {
  const Tag = as;

  return (
    <Tag className={`py-20 ${className ?? ""}`.trim()}>
      <div className={`${sizeClasses[size]} mx-auto px-6 ${containerClassName ?? ""}`.trim()}>
        {children}
      </div>
    </Tag>
  );
}
