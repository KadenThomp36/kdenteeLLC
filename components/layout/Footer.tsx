import Container from "@/components/ui/Container";
import TextLink from "@/components/ui/TextLink";
import { externalUrls, mailto, site } from "@/lib/site";

// Site footer: one quiet row (stacks on mobile).
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <div className="flex flex-col gap-y-3 border-t border-rule pb-10 pt-6 text-small text-graphite md:flex-row md:items-baseline md:gap-x-8 md:pb-12 md:pt-8">
          <p className="md:mr-auto">
            {site.name}, {site.location}
          </p>
          {/* Links share a row at every width so their 44px tap areas never stack. */}
          <p className="flex flex-wrap gap-x-8 gap-y-4">
            <TextLink href={mailto} standalone>
              {site.email}
            </TextLink>
            <TextLink href={externalUrls.github} standalone>
              GitHub
            </TextLink>
          </p>
          <p>© {year}</p>
        </div>
      </Container>
    </footer>
  );
}
