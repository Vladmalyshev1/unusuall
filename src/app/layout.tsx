import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Header } from "@/components/header/header";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "UNUSUALL",
  icons: {
    icon: [
      { url: "/logo/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48 64x64" },
      { url: "/logo/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: { url: "/logo/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main id="main-content" tabIndex={-1} className="mx-auto max-w-3xl px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
