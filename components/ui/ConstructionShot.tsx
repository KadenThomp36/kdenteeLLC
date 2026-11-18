import Image from "next/image";

// Hope Township's unlaunched site: a blurred shot behind two strips of caution tape.
// Same frame as BrowserShot. The tape is decorative; the image carries the text alternative.
const TAPE_REPEATS = 9;

export default function ConstructionShot({
  sizes,
  alt = "Hope Township’s new website, still being built",
  className = "",
}: {
  /** Rendered width hint, e.g. "(min-width: 768px) 50vw, 100vw". */
  sizes: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={`wip relative aspect-[16/10] overflow-hidden rounded-image border border-rule bg-surface ${className}`}
    >
      <Image
        src="/img/work/hope-blurred.jpg"
        alt={alt}
        fill
        sizes={sizes}
        className="wip-image object-cover object-top"
      />
      <div className="wip-veil" aria-hidden="true" />
      <div className="tape tape-words" aria-hidden="true">
        {Array.from({ length: TAPE_REPEATS }, (_, i) => (
          <span key={i} className="contents">
            {i > 0 ? <i /> : null}
            <span>Under construction</span>
          </span>
        ))}
      </div>
      <div className="tape tape-stripes" aria-hidden="true" />
    </div>
  );
}
