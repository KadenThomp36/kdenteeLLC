"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/site";
import { trackNavigation } from "@/lib/analytics";

// Main nav. Client-only because it marks the current page (aria-current + pink underline).
// Other items get the same underline on hover.
export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main">
      <ul className="-mr-1.5 flex items-center text-small min-[400px]:-mr-2 sm:-mr-3 md:-mr-4 md:text-[0.9375rem]">
        {navItems.map((item) => {
          const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={() => trackNavigation(item.label)}
                className={`-my-3 block rounded-control px-1.5 py-3 min-[400px]:px-2 sm:px-3 md:px-4 ${
                  current
                    ? "text-link text-ink"
                    : // Same pink underline as the current page, faded in on hover.
                      "text-graphite underline decoration-transparent decoration-[1.5px] underline-offset-4 transition-[color,text-decoration-color] duration-150 ease-out hover:text-ink hover:decoration-pink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
