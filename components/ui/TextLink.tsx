import Link from "next/link";
import type { ReactNode } from "react";

// Text link with the pink underline. `external` opens a new tab and tells screen readers so.
// `standalone` (a link on its own line, not inside a sentence) adds a 44px-tall tap area.
export default function TextLink({
  href,
  external = false,
  standalone = false,
  className = "",
  children,
  ...rest
}: {
  href: string;
  external?: boolean;
  standalone?: boolean;
  className?: string;
  children: ReactNode;
  "aria-current"?: "page";
}) {
  const cls = `text-link ${standalone ? "tap-target" : ""} ${className}`;
  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
        {...rest}
      >
        {children}
        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
