import Link from "next/link";
import Container from "@/components/ui/Container";
import Wordmark from "@/components/ui/Wordmark";
import NavLinks from "./NavLinks";

// Site header: wordmark home link left, the four nav links right. Not sticky, no menu button.
export default function Header() {
  return (
    <header>
      <Container className="flex items-center justify-between gap-2 py-5 md:py-7">
        <Link href="/" aria-label="Kdentee LLC, home" className="-my-3.5 shrink-0 rounded-control py-3.5">
          <Wordmark className="text-[1.125rem] min-[400px]:text-[1.25rem] sm:text-[1.375rem]" />
        </Link>
        <NavLinks />
      </Container>
    </header>
  );
}
