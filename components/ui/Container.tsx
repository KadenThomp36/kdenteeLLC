import type { ElementType, ReactNode } from "react";

// The one page container: 1120px content width, 24px gutters (40px from 768px).
export default function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`mx-auto box-content max-w-container px-6 md:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
