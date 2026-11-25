import type { ComponentPropsWithRef, ReactNode } from "react";

import { Icon } from "./icon";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
};

function Field({
  id, label, hint, error, hideLabel, children,
}: FieldProps & { children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={hideLabel ? "sr-only" : "ui-field-label"}>{label}</label>
      {children}
      {hint && <p id={`${id}-hint`} className="ui-field-message text-text-muted">{hint}</p>}
      {error && <p id={`${id}-error`} className="ui-field-message text-error">{error}</p>}
    </div>
  );
}

function fieldDescription({ id, hint, error }: FieldProps, description?: string) {
  return [description, hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}

type NativeFieldProps<Tag extends "input" | "select" | "textarea"> = FieldProps &
  Omit<ComponentPropsWithRef<Tag>, keyof FieldProps>;

export function TextField({
  id, label, hint, error, hideLabel, className = "", "aria-describedby": description, ...props
}: NativeFieldProps<"input">) {
  const field = { id, label, hint, error, hideLabel };

  return (
    <Field {...field}>
      <input {...props} id={id} className={`ui-field ${className}`}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={fieldDescription(field, description)} />
    </Field>
  );
}

export function SelectField({
  id, label, hint, error, hideLabel, className = "", "aria-describedby": description, ...props
}: NativeFieldProps<"select">) {
  const field = { id, label, hint, error, hideLabel };

  return (
    <Field {...field}>
      <div className="relative">
        <select {...props} id={id} className={`ui-field ui-select ${className}`}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={fieldDescription(field, description)} />
        <Icon name="chevron-down" className="ui-select-icon" />
      </div>
    </Field>
  );
}

export function Textarea({
  id, label, hint, error, hideLabel, className = "", "aria-describedby": description, ...props
}: NativeFieldProps<"textarea">) {
  const field = { id, label, hint, error, hideLabel };

  return (
    <Field {...field}>
      <textarea {...props} id={id} className={`ui-field ui-textarea ${className}`}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={fieldDescription(field, description)} />
    </Field>
  );
}
