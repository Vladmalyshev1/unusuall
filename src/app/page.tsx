import type { Metadata } from "next";
import Image from "next/image";

import { BracketLink } from "@/components/ui/bracket-action";
import { PlusMark, StarMark } from "@/components/ui/decoration";
import { ProcessSteps } from "@/components/ui/structured-content";

import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Вышивка на заказ — UNUSUALL",
};

const steps = [
  "Идея и дизайн",
  "Подготовка к вышивке",
  "Производство на оборудовании",
  "Готовая вещь",
] as const;

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroArt} aria-hidden="true">
          <Image
            src="/images/backgrounds/home-hero.webp"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 78vw, (min-width: 576px) 680px, (max-width: 338px) 450px, calc(100vw + 112px)"
            className={styles.photo}
          />
        </div>
        <svg className={styles.heroOrbit} viewBox="0 0 1536 511"
          preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path className={styles.orbitExtension} d="M-20 370 Q155 248 400 187" />
          <path d="M1274 425 C1357 384 1496 306 1438 294 Q1412 288 1358 294" />
        </svg>
        <StarMark className={styles.heroStar} />
        <span className={styles.coordinates} aria-hidden="true">
          55.7558° N<br />37.6173° E
        </span>
        <div className={`${styles.inner} ${styles.heroContent}`}>
          <h1 id="home-title" className={`display-heading ${styles.title}`}>
            Вышивка<br />на заказ
          </h1>
          <p className={styles.tagline}>
            Твой дизайн, любая вещь —<br />реальная вышивка
          </p>
          <BracketLink href="/create-order" arrow="outside" className={styles.heroAction}>
            Создать заказ
          </BracketLink>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="home-process">
        <div className={`${styles.inner} ${styles.processInner}`}>
          <h2 className={styles.processTitle} id="home-process">Как это работает</h2>
          <ProcessSteps steps={steps} className={styles.steps} showLastArrow />
        </div>
      </section>

      <section className={styles.order} aria-labelledby="home-order">
        <div className={styles.orderArt} aria-hidden="true">
          <div className={styles.orderCrop}>
            <Image
              src="/images/backgrounds/embroidery-detail.webp"
              alt=""
              fill
              fetchPriority="low"
              sizes="(min-width: 576px) 100vw, calc(100vw + 140px)"
              className={styles.photo}
            />
          </div>
        </div>
        <svg className={styles.orderLines} viewBox="0 0 1536 239"
          preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path className={styles.orderTopLine} d="M-11 117 C59 37 194 1 388 1H1548" />
          <path className={styles.orderDesktopLine} d="M340 254 C700 78 1072 10 1450 -12" />
          <path className={styles.orderMobileLine} d="M-29 218 C341 183 1044 47 1562 31" />
        </svg>
        <div className={`${styles.inner} ${styles.orderContent}`}>
          <PlusMark className={styles.orderPlus} />
          <h2 className={`display-heading ${styles.orderTitle}`} id="home-order">
            Создай<br />свою вещь
          </h2>
          <BracketLink href="/create-order" aria-label="Создать заказ" className={styles.orderAction} />
        </div>
      </section>
    </div>
  );
}
