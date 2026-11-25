import type { ReactNode } from "react";

import { Icon, type IconName } from "./icon";

export function ProcessSteps({ steps, className = "", showLastArrow = false }: {
  steps: readonly string[]; className?: string; showLastArrow?: boolean;
}) {
  return (
    <ol className={`ui-process ${className}`} role="list">
      {steps.map((step, index) => (
        <li key={step}>
          <span aria-hidden="true" className="ui-process-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{step}</span>
          {(showLastArrow || index < steps.length - 1) && <Icon name="arrow-right" className="ui-process-arrow" />}
        </li>
      ))}
    </ol>
  );
}

export function BenefitsGrid({ items }: { items: readonly { label: string; icon: IconName }[] }) {
  return (
    <ul className="ui-benefits" role="list">
      {items.map(({ label, icon }) => (
        <li key={label}>
          <Icon name={icon} />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

export function FormStep({
  number, title, children,
}: { number: number; title: ReactNode; children: ReactNode }) {
  return (
    <div className="ui-form-step">
      <span aria-hidden="true" className="ui-step-number">{String(number).padStart(2, "0")}</span>
      <h3 className="ui-step-title">
        {title}<span aria-hidden="true" className="ui-step-dash" />
      </h3>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
