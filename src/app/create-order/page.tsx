import type { Metadata } from "next";
import Image from "next/image";

import { OrbitDecoration, StarMark } from "@/components/ui/decoration";
import { OrderForm } from "@/features/create-order/order-form";

import styles from "./create-order.module.css";

export const metadata: Metadata = {
  title: "Создание заказа — UNUSUALL",
};

const embroideryArt = "/images/backgrounds/embroidery-detail.webp";

export default function CreateOrderPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="order-title">
        <div className={styles.heroArt} aria-hidden="true">
          <Image src={embroideryArt} alt="" fill
            sizes="(min-width: 1024px) 64vw, clamp(490px, 115vw, 900px)" preload />
        </div>
        <OrbitDecoration className={styles.orbit} />
        <StarMark className={styles.star} />
        <div className={styles.heroContent}>
          <h1 id="order-title" className={`display-heading ${styles.title}`}>Создание<br />заказа</h1>
          <p className={styles.tagline}>Расскажи о своей идее —<br />мы превратим ее в вышивку</p>
        </div>
      </section>

      <section className={styles.formSection} aria-labelledby="order-form-title">
        <h2 id="order-form-title" className="sr-only">Детали заказа</h2>
        <div className={styles.bottomArt} aria-hidden="true">
          <Image src={embroideryArt} alt="" fill sizes="(min-width: 1024px) 44vw, 1px" />
        </div>
        <div className={styles.formFrame}>
          <OrderForm />
        </div>
      </section>
    </div>
  );
}
