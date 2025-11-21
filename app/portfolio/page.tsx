import type { Metadata } from "next";
import InfoSection from "@/components/shared/InfoSection";

export const metadata: Metadata = {
  title: "Portfolio - Kdentee LLC",
  description: "View our portfolio of web design and development projects",
};

export default function Portfolio() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Our Work</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our portfolio of successful projects and creative solutions
          </p>
        </div>
      </section>

      {/* Lincoln Township */}
      <InfoSection
        headline="Lincoln Township Website"
        copy="A modern, accessible website for Lincoln Township featuring comprehensive information about local government services, community events, and resources. Built with responsive design to serve residents on any device."
        imageSrc="/jpg/lincoln-preview.jpg"
        imageAlt="Lincoln Township Website"
        buttonLink="https://www.lincoln-twp.org"
        buttonText="Visit Site"
      />

      {/* Photography Portfolio */}
      <InfoSection
        headline="Photography Portfolio"
        copy="Professional photography showcasing diverse subjects from landscapes to portraits. Each image tells a story and captures moments with artistic vision and technical excellence."
        imageSrc="/jpg/Photography.jpeg"
        imageAlt="Photography Portfolio"
        buttonLink="https://unsplash.com/@kadenthomp36"
        buttonText="View on Unsplash"
        reverse
      />

      {/* GitHub Projects */}
      <InfoSection
        headline="Open Source Projects"
        copy="Contributing to the developer community through open source projects and code repositories. Check out our GitHub for more technical projects and contributions."
        imageSrc="/jpg/github.jpg"
        imageAlt="GitHub Projects"
        buttonLink="https://github.com/kdentee"
        buttonText="Visit GitHub"
      />
    </div>
  );
}
