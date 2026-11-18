import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Prose from "@/components/ui/Prose";
import Button from "@/components/ui/Button";
import LedgerRows, { LedgerRow } from "@/components/ui/LedgerRows";
import { pageMetadata } from "@/lib/site";
import portrait from "@/public/img/kaden-about.jpg";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Kaden Thompson is a software engineer in Waterford, Michigan, and runs Kdentee on his own. Who he is, and how a website project with him goes from first conversation to launch.",
  path: "/about",
});

const steps = [
  { title: "We talk", text: "You tell me about your organization, your current site and what bothers you about it." },
  { title: "A written proposal", text: "You get a fixed price and a clear list of what is included." },
  {
    title: "The build",
    text: "You watch the site come together on a private preview link and tell me what to change.",
  },
  { title: "Launch", text: "I move your content over, train your staff and switch the domain." },
  { title: "After launch", text: "I host the site, keep it updated and fix what breaks." },
];

export default function AboutPage() {
  return (
    <>
      {/* Same vertical rhythm as PageIntro, with the portrait beside the text from lg up.
          He looks to the right, so the photo sits left of the text. */}
      <Container>
        <div className="grid gap-y-10 pb-14 pt-8 md:gap-y-12 md:pb-20 md:pt-14 lg:grid-cols-[22.5rem_minmax(0,1fr)] lg:gap-x-16 lg:pb-24 lg:pt-20 xl:gap-x-20">
          <figure className="max-w-[17.5rem] md:max-w-[20rem] lg:max-w-none">
            <Image
              src={portrait}
              alt="Kaden Thompson"
              sizes="(min-width: 1024px) 360px, (min-width: 768px) 320px, 280px"
              className="block aspect-[4/5] h-auto w-full rounded-image border border-rule object-cover object-top"
            />
          </figure>
          <div className="lg:pt-1">
            <h1 className="max-w-heading text-h1">About</h1>
            <Prose className="mt-6 md:mt-8">
              <p className="text-lede">
                I’m Kaden Thompson. I’m a software engineer by trade, and Kdentee is the company I run
                on my own.
              </p>
              <p>
                Building things is also what I do for fun. I run my own servers at home, wrote a web
                browser for my Mac, and publish open source dashboard cards for Home Assistant.
              </p>
              <p>
                I fuss over details most people never notice: how a meeting agenda reads on an old
                phone, whether a screen reader can get through a form, how a page loads on slow rural
                internet.
              </p>
              <p>
                When you hire Kdentee you work with me directly. I answer the email, write the code and
                fix what breaks.
              </p>
              <p>I used to live in Midland and now live in Waterford, Michigan.</p>
            </Prose>
          </div>
        </div>
      </Container>

      <Section id="how-a-project-goes" heading="How a project goes">
        <LedgerRows as="ol">
          {steps.map((step, i) => (
            <LedgerRow key={step.title} label={`${i + 1}. ${step.title}`}>
              <p>{step.text}</p>
            </LedgerRow>
          ))}
        </LedgerRows>
      </Section>

      <Section
        id="get-in-touch"
        heading="Get in touch"
        intro="Tell me a little about your organization and what you need. I reply by the next business day."
      >
        <Button href="/contact">Send a message</Button>
      </Section>
    </>
  );
}
