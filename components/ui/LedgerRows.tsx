import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";

// Ledger rows, the site's one repeated layout: label (or h3) left, text right, 1px rule
// between rows; stacks on mobile.
//   <LedgerRows>              → <div> of <div> rows, labels are <h3>
//   <LedgerRows as="ol"|"ul"> → list; rows become <li>, labels <h3>
//   <LedgerRows as="dl">      → definition list; labels <dt>, text <dd>
//   <LedgerRows stacked>      → label above text at every width (for narrow columns)
//   <LedgerRows compact>      → label stays in a left column on mobile too (short labels only);
//                               `labelWidth` sets that column below 768px (default 5.5rem)
// The right column accepts any children (paragraphs, links, lists).

type ListAs = "div" | "ol" | "ul" | "dl";
type RowAs = "div" | "li";
type LabelAs = "h3" | "dt" | "p";

type LedgerRowProps = {
  label: ReactNode;
  children: ReactNode;
  /** Defaults to h3; LedgerRows sets dt for dl. */
  labelAs?: LabelAs;
  id?: string;
  className?: string;
  /** Set by LedgerRows; you don't need to pass these. */
  as?: RowAs;
  bodyAs?: "div" | "dd";
  stacked?: boolean;
  compact?: boolean;
};

export function LedgerRow({
  label,
  children,
  labelAs: Label = "h3",
  as: Row = "div",
  bodyAs: Body = "div",
  stacked = false,
  compact = false,
  id,
  className = "",
}: LedgerRowProps) {
  const layout = stacked
    ? "gap-y-1 py-4 md:py-5"
    : compact
      ? // Below md: the label column from LedgerRows' --ledger-label, first lines on one baseline.
        // From md: identical to the default row.
        "grid-cols-[var(--ledger-label,5.5rem)_minmax(0,1fr)] items-baseline gap-x-5 py-5 " +
        "md:grid-cols-[15rem_minmax(0,1fr)] md:items-stretch md:gap-x-10 md:py-6"
      : "gap-y-1.5 py-5 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-x-10 md:py-6";
  return (
    <Row id={id} className={`grid border-t border-rule ${layout} ${className}`}>
      <Label className="text-h3 text-ink">{label}</Label>
      <Body className={`max-w-prose text-graphite [&>*+*]:mt-3 ${compact ? "break-words" : ""}`}>
        {children}
      </Body>
    </Row>
  );
}

export default function LedgerRows({
  as: List = "div",
  stacked = false,
  compact = false,
  labelWidth,
  className = "",
  children,
}: {
  as?: ListAs;
  /** Label above text at every width. */
  stacked?: boolean;
  /** Keep the label in a left column below 768px instead of stacking it. Short labels only. */
  compact?: boolean;
  /** Width of the label column below 768px when `compact`, e.g. "5rem". Defaults to 5.5rem. */
  labelWidth?: string;
  className?: string;
  children: ReactNode;
}) {
  const rowProps: Partial<LedgerRowProps> = {
    stacked,
    compact: compact && !stacked,
    ...(List === "dl"
      ? { as: "div", labelAs: "dt", bodyAs: "dd" }
      : List === "div"
        ? {}
        : { as: "li" }),
  };
  return (
    <List
      className={className}
      style={compact && labelWidth ? ({ "--ledger-label": labelWidth } as CSSProperties) : undefined}
    >
      {Children.map(children, (child) =>
        isValidElement(child) ? cloneElement(child as ReactElement<LedgerRowProps>, rowProps) : child,
      )}
    </List>
  );
}
