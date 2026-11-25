import type { CSSProperties } from "react";

export type IconName =
  | "arrow-right" | "cap" | "check" | "chevron-down" | "close"
  | "grid" | "hoodie" | "infinity" | "jacket" | "layers" | "lightning"
  | "menu" | "more" | "plus" | "sparkle" | "t-shirt" | "upload";

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`ui-icon ${className}`}
      style={{ "--icon-image": `url(/icons/${name}.svg)` } as CSSProperties}
    />
  );
}
