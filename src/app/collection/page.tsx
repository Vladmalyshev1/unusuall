import type { Metadata } from "next";
import Image from "next/image";

import { StarMark } from "@/components/ui/decoration";

import { CollectionCatalog } from "./collection-catalog";
import { CollectionCatalogLight, CollectionHeroLight } from "./collection-light";
import styles from "./collection.module.css";

export const metadata: Metadata = {
  title: "Коллекция — UNUSUALL",
};

export default function CollectionPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="collection-title">
        <div className={styles.heroArt} aria-hidden="true">
          <Image
            src="/images/backgrounds/collection-hero.webp"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 63vw, (min-width: 576px) 78vw, 500px"
            className="object-cover"
          />
        </div>
        <CollectionHeroLight />
        <svg className={styles.heroOrbit} viewBox="0 0 1000 180" fill="none"
          preserveAspectRatio="none" aria-hidden="true">
          <path d="M-26 192 C165 112 373 91 659 45 C798 23 929 35 948 72 C968 111 823 141 708 153" />
        </svg>
        <StarMark className={styles.heroStar} />
        <div className={styles.heroInner}>
          <div>
            <h1 id="collection-title" className={`display-heading ${styles.title}`}>Коллекция</h1>
            <p className={styles.tagline}>Готовые изделия с авторской<br />вышивкой UNUSUALL</p>
          </div>
          <p className={styles.description}>
            Лимитированные коллекции и базовые модели с уникальной вышивкой — для тех, кто ценит детали.
          </p>
        </div>
      </section>
      <CollectionCatalog>
        <CollectionCatalogLight />
      </CollectionCatalog>
    </div>
  );
}
