"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/site";
import { trackNavigation } from "@/lib/analytics";

// Main nav. Client-only because it marks the current page (aria-current + pink underline).
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
                className={`-my-3 block rounded-control px-1.5 py-3 transition-colors min-[400px]:px-2 sm:px-3 md:px-4 duration-150 ease-out ${
                  current ? "text-link text-ink" : "text-graphite hover:text-ink"
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
