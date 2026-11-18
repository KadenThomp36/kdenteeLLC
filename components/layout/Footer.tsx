import Container from "@/components/ui/Container";
import TextLink from "@/components/ui/TextLink";
import { externalUrls, mailto, site } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

// Site footer: one quiet row (stacks on mobile).
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <div className="border-t border-rule pb-10 pt-6 text-small text-graphite md:pb-12 md:pt-8">
          <div className="flex flex-col gap-y-3 md:flex-row md:items-baseline md:gap-x-8">
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
          {/* Its own line at every width, so the row above keeps its spacing. */}
          <ThemeToggle className="mt-3 md:mt-4" />
        </div>
      </Container>
    </footer>
  );
}
