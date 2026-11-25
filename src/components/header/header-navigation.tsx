"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";

const routes = [
  { href: "/", label: "Главная" },
  { href: "/collection", label: "Коллекция" },
  { href: "/create-order", label: "Создать заказ" },
  { href: "/about", label: "О бренде" },
] as const;

type HeaderRoute = typeof routes[number];

export function HeaderNavigation({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const current = routes.find(({ href }) => pathname === href);

  if (!current) return null;

  return (
    <header className="site-header">
      <a className="header-skip sr-only focus:not-sr-only" href="#main-content">К содержимому</a>
      <div className="header-row">
        {children}
        <Navigation current={current} key={current.href} />
      </div>
    </header>
  );
}

function Navigation({ current }: { current: HeaderRoute }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [open]);

  function closeAndRestoreFocus() {
    toggle.current?.focus();
    setOpen(false);
  }

  return (
    <div
      className="header-navigation"
      onBlur={(event) => {
        if (open && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (!open || event.key !== "Escape") return;
        event.preventDefault();
        closeAndRestoreFocus();
      }}
    >
      <div className="header-mobile-controls">
        <span className="header-current" aria-current={open ? undefined : "page"} aria-hidden={open || undefined}>
          {current.label}
        </span>
        <button
          ref={toggle}
          type="button"
          className="header-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={(event) => {
            event.currentTarget.focus();
            setOpen(!open);
          }}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      <nav id="primary-navigation" aria-label="Основная навигация" className="header-nav" data-open={open}>
        <ul>
          {routes.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="header-nav-link"
                aria-current={href === current.href ? "page" : undefined}
                onNavigate={() => { if (open) closeAndRestoreFocus(); }}
              >
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
