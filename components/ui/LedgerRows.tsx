import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

// Ledger rows, the site's one repeated layout: label (or h3) left, text right, 1px rule
// between rows; stacks on mobile.
//   <LedgerRows>              → <div> of <div> rows, labels are <h3>
//   <LedgerRows as="ol"|"ul"> → list; rows become <li>, labels <h3>
//   <LedgerRows as="dl">      → definition list; labels <dt>, text <dd>
//   <LedgerRows stacked>      → label above text at every width (for narrow columns)
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
};

export function LedgerRow({
  label,
  children,
  labelAs: Label = "h3",
  as: Row = "div",
  bodyAs: Body = "div",
  stacked = false,
  id,
  className = "",
}: LedgerRowProps) {
  const layout = stacked
    ? "gap-y-1 py-4 md:py-5"
    : "gap-y-1.5 py-5 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-x-10 md:py-6";
  return (
    <Row id={id} className={`grid border-t border-rule ${layout} ${className}`}>
      <Label className="text-h3 text-ink">{label}</Label>
      <Body className="max-w-prose text-graphite [&>*+*]:mt-3">{children}</Body>
    </Row>
  );
}

export default function LedgerRows({
  as: List = "div",
  stacked = false,
  className = "",
  children,
}: {
  as?: ListAs;
  /** Label above text at every width. */
  stacked?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const rowProps: Partial<LedgerRowProps> = {
    stacked,
    ...(List === "dl"
      ? { as: "div", labelAs: "dt", bodyAs: "dd" }
      : List === "div"
        ? {}
        : { as: "li" }),
  };
  return (
    <List className={className}>
      {Children.map(children, (child) =>
        isValidElement(child) ? cloneElement(child as ReactElement<LedgerRowProps>, rowProps) : child,
      )}
    </List>
  );
}
