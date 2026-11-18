// The client testimonial, laid out like a ledger row: attribution left, quote right.
// Pass the quote without quotation marks; curly quotes are added. Usage: <Quote {...testimonial} />
export default function Quote({
  quote,
  name,
  role,
  className = "",
}: {
  quote: string;
  name: string;
  role: string;
  className?: string;
}) {
  return (
    <figure
      className={`grid gap-y-4 border-t border-rule pt-6 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-x-10 md:pt-8 ${className}`}
    >
      <figcaption className="text-small text-graphite md:order-first md:pt-1">
        <span className="block font-medium text-ink">{name}</span>
        {role}
      </figcaption>
      <blockquote className="order-first max-w-[34em] text-lede tracking-[-0.01em] text-ink md:order-none">
        <p className="-indent-[0.4em]">“{quote}”</p>
      </blockquote>
    </figure>
  );
}
