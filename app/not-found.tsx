import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import TextLink from "@/components/ui/TextLink";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <PageIntro title="This page doesn’t exist." lede="The address may be old or mistyped.">
      <TextLink href="/" standalone>Go to the home page</TextLink>
    </PageIntro>
  );
}
