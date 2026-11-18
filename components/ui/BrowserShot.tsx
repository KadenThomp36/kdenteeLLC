import Image, { type StaticImageData } from "next/image";

// A website screenshot in a 16:10 frame (12px radius, 1px rule border), cropped from the top.
export default function BrowserShot({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string | StaticImageData;
  alt: string;
  /** Rendered width hint, e.g. "(min-width: 768px) 50vw, 100vw". */
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden rounded-image border border-rule bg-surface ${className}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
}
