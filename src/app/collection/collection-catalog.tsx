"use client";

import { type ReactNode, useState } from "react";

import { CategoryFilter } from "@/components/ui/choice-group";
import { ProductCard } from "@/components/ui/product-card";

import { filters, products, type CollectionFilter } from "./catalog-data";
import styles from "./collection.module.css";

const categoryLabels = {
  hoodie: "Худи",
  tshirt: "Футболки",
  jacket: "Куртки",
  accessory: "Аксессуары",
} as const;

export function CollectionCatalog({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<CollectionFilter>("all");
  const visibleProducts = products.filter((product) => (
    filter === "all" || (filter === "limited" ? product.limited === true : product.category === filter)
  ));

  const status = visibleProducts.length
    ? `Показано изделий: ${visibleProducts.length}.`
    : filter === "limited"
      ? "Лимитированные изделия пока не подтверждены."
      : "В этой категории пока нет изделий.";

  return (
    <section className={styles.catalog} aria-labelledby="collection-catalog-title">
      {children}
      <div className={styles.catalogInner}>
        <h2 id="collection-catalog-title" className="sr-only">Изделия коллекции</h2>
        <div className={styles.filters}>
          <CategoryFilter
            hideLegend
            legend="Категории изделий"
            name="collection-category"
            options={filters}
            value={filter}
            onChange={(event) => {
              const next = filters.find(({ value }) => value === event.currentTarget.value);
              if (next) setFilter(next.value);
            }}
          />
        </div>
        <p role="status" className={visibleProducts.length ? "sr-only" : styles.empty}>{status}</p>
        {visibleProducts.length > 0 && (
          <ul className={styles.products} role="list">
            {visibleProducts.map(({ name, category, image }) => (
              <li key={name} data-category={category}>
                <ProductCard name={name} category={categoryLabels[category]} image={image} loading="eager" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
