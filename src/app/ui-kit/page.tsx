import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "UI Kit · UNUSUALL",
  robots: { index: false, follow: false },
};

export default async function UiKitPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  const { Showcase } = await import("@/features/ui-kit/showcase");
  return <Showcase />;
}
