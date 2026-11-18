// The "kdentee." wordmark (M PLUS Rounded 1c 800, ink with a pink dot). Text only; wrap in a link
// yourself. Size it with a text-[…] class (defaults to 22px).
export default function Wordmark({ className = "text-[1.375rem]" }: { className?: string }) {
  return (
    <span className={`font-wordmark font-extrabold leading-none tracking-[-0.01em] text-ink ${className}`}>
      kdentee<span className="text-pink">.</span>
    </span>
  );
}
