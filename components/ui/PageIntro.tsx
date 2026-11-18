import type { ReactNode } from "react";
import Container from "./Container";

// Top of every inner page: the h1 and an optional lede, with consistent spacing.
// Extra children (e.g. a link) render under the lede. Follow it with <Section>s.
export default function PageIntro({
  title,
  lede,
  children,
}: {
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Container>
      <div className="pb-14 pt-8 md:pb-20 md:pt-14 lg:pb-24 lg:pt-20">
        <h1 className="max-w-heading text-h1">{title}</h1>
        {lede ? <p className="mt-5 max-w-prose text-lede text-graphite md:mt-6">{lede}</p> : null}
        {children ? <div className="mt-6 md:mt-8">{children}</div> : null}
      </div>
    </Container>
  );
}
