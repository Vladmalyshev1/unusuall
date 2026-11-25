import type { ChangeEventHandler } from "react";

import { Icon, type IconName } from "./icon";

type Choice = { value: string; label: string; icon: IconName; disabled?: boolean };

type ChoiceGroupProps = {
  name: string;
  legend: string;
  options: readonly Choice[];
  disabled?: boolean;
  hideLegend?: boolean;
  error?: string;
} & (
  | { defaultValue?: string; value?: never; onChange?: ChangeEventHandler<HTMLInputElement> }
  | { defaultValue?: never; value: string; onChange: ChangeEventHandler<HTMLInputElement> }
);

function ChoiceGroup({
  name, legend, options, disabled, hideLegend, error, defaultValue, value, onChange, variant,
}: ChoiceGroupProps & { variant: "category" | "garment" }) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <fieldset className="min-w-0" disabled={disabled} data-invalid={error ? true : undefined}>
      <legend className={hideLegend ? "sr-only" : "mb-3 text-sm font-medium"}>{legend}</legend>
      <div className={`ui-choices ui-choices--${variant}`}>
        {options.map((option) => (
          <label key={option.value} className="relative min-w-0">
            <input
              className="ui-choice-input sr-only"
              type="radio"
              name={name}
              value={option.value}
              disabled={option.disabled}
              aria-describedby={errorId}
              checked={value === undefined ? undefined : value === option.value}
              defaultChecked={value === undefined ? defaultValue === option.value : undefined}
              onChange={onChange}
            />
            <span className="ui-choice">
              <Icon name={option.icon} />
              <span>{option.label}</span>
              {variant === "garment" && <Icon name="check" className="ui-choice-check" />}
            </span>
          </label>
        ))}
      </div>
      {error && <p id={errorId} className="ui-field-message text-error">{error}</p>}
    </fieldset>
  );
}

export function CategoryFilter(props: ChoiceGroupProps) {
  return <ChoiceGroup {...props} variant="category" />;
}

export function GarmentTypePicker(props: ChoiceGroupProps) {
  return <ChoiceGroup {...props} variant="garment" />;
}
