import type { Metadata } from "next";
import Image from "next/image";

import { BracketLink } from "@/components/ui/bracket-action";
import { OrbitDecoration, PlusMark, StarMark } from "@/components/ui/decoration";
import type { IconName } from "@/components/ui/icon";
import { BenefitsGrid, ProcessSteps } from "@/components/ui/structured-content";

import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "О бренде — UNUSUALL",
};

const steps = [
  "Разрабатываем дизайн",
  "Готовим к вышивке",
  "Вышиваем на оборудовании",
  "Создаём готовую вещь",
] as const;

const benefits = [
  { label: "Индивидуальный подход", icon: "layers" },
  { label: "Высокое качество", icon: "sparkle" },
  { label: "Современное оборудование", icon: "lightning" },
  { label: "Без ограничений в дизайне", icon: "infinity" },
] as const satisfies readonly { label: string; icon: IconName }[];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroArt} aria-hidden="true">
          <Image
            src="/images/backgrounds/about-hero.webp"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 70vw, (min-width: 576px) 100vw, max(136vw, 490px)"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <OrbitDecoration className={styles.heroOrbit} />
        <StarMark className={styles.heroStar} />
        <div className={`${styles.frame} ${styles.heroContent}`}>
          <h1 className={`display-heading ${styles.heroTitle}`} id="about-title">
            О бренде<br />UNUSUAL
          </h1>
          <p className={styles.tagline}>Вышивка, которая делает<br />вещи особенными</p>
        </div>
      </section>

      <section className={styles.idea} aria-labelledby="about-idea">
        <div className={`${styles.frame} ${styles.ideaContent}`}>
          <h2 className={`display-heading ${styles.sectionTitle}`} id="about-idea">
            Наша<br />идея<span className={styles.headingDash} aria-hidden="true" />
          </h2>
          <p className={styles.ideaCopy}>
            Превращать твои идеи в уникальные вышитые вещи. Мы работаем на стыке ручного ремесла,
            технологий и уличной культуры, создавая кастомную вышивку на одежде и аксессуарах.
          </p>
          <div className={styles.machine}>
            <Image
              src="/images/process/embroidery-machine.webp"
              alt="Игла вышивальной машины и строчка на ткани"
              fill
              sizes="(min-width: 1024px) 35vw, 87vw"
              className={styles.machinePhoto}
              loading="eager"
            />
            <PlusMark className={styles.machinePlus} />
          </div>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="about-process">
        <div className={`${styles.frame} ${styles.processContent}`}>
          <h2 className={`display-heading ${styles.sectionTitle}`} id="about-process">
            Как мы <span className={styles.processHeadingLine}>
              работаем<span className={styles.headingDash} aria-hidden="true" />
            </span>
          </h2>
          <ProcessSteps steps={steps} className={styles.steps} showLastArrow />
        </div>
      </section>

      <section className={styles.benefits} aria-labelledby="about-benefits">
        <h2 className="sr-only" id="about-benefits">Преимущества</h2>
        <BenefitsGrid items={benefits} />
      </section>

      <section className={styles.order} aria-labelledby="about-order">
        <div className={styles.orderArt} aria-hidden="true">
          <Image
            src="/images/backgrounds/thread-spools.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 74vw, (min-width: 576px) 70vw, 580px"
            className="object-cover"
            fetchPriority="low"
          />
        </div>
        <svg className={styles.orderOrbit} viewBox="0 0 1536 244" fill="none"
          preserveAspectRatio="none" aria-hidden="true">
          <path className={styles.orbitWide} d="M798 225 C1085 233 1396 206 1550 140" />
          <path className={styles.orbitNarrow} d="M-16 203 C234 154 552 145 895 135" />
        </svg>
        <StarMark className={styles.orderStar} />
        <div className={`${styles.frame} ${styles.orderContent}`}>
          <h2 className={`display-heading ${styles.orderTitle}`} id="about-order">
            Создай<br />свою вещь
          </h2>
          <BracketLink href="/create-order" className={styles.action}>Создать заказ</BracketLink>
        </div>
      </section>
    </div>
  );
}
