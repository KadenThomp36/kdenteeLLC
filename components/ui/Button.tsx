import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

// The primary action. Pass `href` for a link (internal → next/link), omit it for a <button>.
type Common = { children: ReactNode; className?: string; variant?: "primary" };
type AsLink = Common & { href: string; external?: boolean };
type AsButton = Common & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

export const buttonClasses =
  "inline-flex min-h-11 select-none items-center justify-center rounded-control bg-pink px-5 py-2.5 " +
  "font-medium leading-tight text-white transition-[background-color,transform] duration-150 ease-out " +
  "hover:bg-pink-deep active:scale-[0.97] active:bg-pink-deep disabled:pointer-events-none disabled:opacity-60";

export default function Button(props: AsLink | AsButton) {
  const cls = `${buttonClasses} ${props.className ?? ""}`;
  if (props.href !== undefined) {
    const { href, external, children } = props;
    if (external || /^(https?:|mailto:|tel:)/.test(href)) {
      return (
        <a
          href={href}
          className={cls}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  const { children, className, variant, type = "button", ...rest } = props;
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
