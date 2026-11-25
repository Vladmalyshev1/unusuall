import Link from "next/link";
import type { ComponentProps, ComponentPropsWithRef } from "react";

import { Icon } from "./icon";

type ActionLabel =
  | { children: string; "aria-label"?: string; arrow?: boolean | "outside" }
  | { children?: never; "aria-label": string; arrow?: true };

function Brackets({ children, arrow }: { children?: string; arrow: boolean }) {
  return (
    <span className="ui-brackets">
      {children}
      {arrow && <Icon name="arrow-right" />}
    </span>
  );
}

type ButtonProps = Omit<ComponentPropsWithRef<"button">, keyof ActionLabel> &
  ActionLabel & { pending?: boolean };

export function BracketButton({
  children, arrow = true, className = "", disabled, pending, type = "button", ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || pending}
      aria-busy={pending || props["aria-busy"]}
      className={`ui-action ${arrow === "outside" ? "ui-action--arrow-outside" : ""} ${className}`}
    >
      <Brackets arrow={arrow === true}>{children}</Brackets>
      {arrow === "outside" && <Icon name="arrow-right" />}
    </button>
  );
}

type LinkProps = Omit<ComponentProps<typeof Link>, keyof ActionLabel> & ActionLabel;

export function BracketLink({ children, arrow = true, className = "", ...props }: LinkProps) {
  return (
    <Link {...props} className={`ui-action ${arrow === "outside" ? "ui-action--arrow-outside" : ""} ${className}`}>
      <Brackets arrow={arrow === true}>{children}</Brackets>
      {arrow === "outside" && <Icon name="arrow-right" />}
    </Link>
  );
}
