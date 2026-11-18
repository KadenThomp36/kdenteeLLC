import type { ReactNode } from "react";
import Container from "./Container";

// A page section: container-width rule line on top, standard vertical padding,
// and an optional h2 + small meta line + intro paragraph with consistent spacing before the content.
export default function Section({
  id,
  heading,
  meta,
  intro,
  rule = true,
  className = "",
  children,
}: {
  id?: string;
  /** Rendered as the section's h2. */
  heading?: ReactNode;
  /** Small graphite line directly under the h2 (e.g. "Midland County, Michigan"). */
  meta?: ReactNode;
  /** Short graphite paragraph under the h2. */
  intro?: ReactNode;
  /** Set false to drop the top rule (e.g. directly under a PageIntro). */
  rule?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={heading && headingId ? headingId : undefined}
      className="scroll-mt-6"
    >
      <Container>
        <div className={`py-14 md:py-20 lg:py-24 ${rule ? "border-t border-rule" : ""} ${className}`}>
          {heading ? (
            <h2 id={headingId} className="max-w-heading text-h2">
              {heading}
            </h2>
          ) : null}
          {meta ? <p className="mt-2 text-small text-graphite">{meta}</p> : null}
          {intro ? <p className="mt-3 max-w-prose text-graphite">{intro}</p> : null}
          {heading && children ? <div className="mt-8 md:mt-10">{children}</div> : children}
        </div>
      </Container>
    </section>
  );
}
