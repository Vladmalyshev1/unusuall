import { Icon } from "./icon";

export function OrbitDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 640 160"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M-24 150C108 76 300 16 526 14c96-1 137 18 130 51-6 29-56 62-146 99"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function StarMark({ className = "" }: { className?: string }) {
  return <Icon name="sparkle" className={`pointer-events-none ${className}`} />;
}

export function PlusMark({ className = "" }: { className?: string }) {
  return <Icon name="plus" className={`pointer-events-none ${className}`} />;
}

export function SectionDivider({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none border-t border-line ${className}`} />;
}
