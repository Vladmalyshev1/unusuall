import Image from "next/image";
import type { ReactNode } from "react";

import { BracketButton, BracketLink } from "@/components/ui/bracket-action";
import { CategoryFilter, GarmentTypePicker } from "@/components/ui/choice-group";
import { OrbitDecoration, PlusMark, SectionDivider, StarMark } from "@/components/ui/decoration";
import { SelectField, Textarea, TextField } from "@/components/ui/fields";
import type { IconName } from "@/components/ui/icon";
import { BenefitsGrid, FormStep, ProcessSteps } from "@/components/ui/structured-content";

import { DemoUpload } from "./demo-upload";
import "./showcase.css";

const categories = [
  { value: "all", label: "Все изделия", icon: "grid" },
  { value: "hoodie", label: "Худи", icon: "hoodie" },
  { value: "tshirt", label: "Футболки", icon: "t-shirt" },
  { value: "jacket", label: "Куртки", icon: "jacket" },
  { value: "accessory", label: "Аксессуары", icon: "cap" },
  { value: "limited", label: "Лимитированные", icon: "sparkle" },
] as const;

const garments = [
  { value: "hoodie", label: "Худи", icon: "hoodie" },
  { value: "tshirt", label: "Футболка", icon: "t-shirt" },
  { value: "jacket", label: "Куртка", icon: "jacket" },
  { value: "accessory", label: "Аксессуар", icon: "cap" },
  { value: "other", label: "Другое", icon: "more" },
] as const;

const benefits: readonly { label: string; icon: IconName }[] = [
  { label: "Индивидуальный подход", icon: "layers" },
  { label: "Высокое качество", icon: "sparkle" },
  { label: "Современное оборудование", icon: "lightning" },
  { label: "Без ограничений в дизайне", icon: "infinity" },
];

function SampleSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="site-container space-y-6 py-8 md:py-10">
      <h2 id={`${id}-heading`} className="display-heading text-display-section">{title}</h2>
      {children}
    </section>
  );
}

export function Showcase() {
  return (
    <div className="ui-kit">
      <div className="ui-kit-intro relative isolate overflow-hidden">
        <OrbitDecoration className="absolute right-0 bottom-0 -z-10 h-44 w-full max-w-3xl text-glow/60" />
        <StarMark className="absolute top-12 right-[15%] -z-10 size-6 text-focus" />
        <div className="site-container space-y-4 py-10 md:py-16">
          <h1 className="display-heading text-display-home">UI Kit</h1>
          <p className="text-xs font-medium tracking-signature text-text-secondary uppercase">UNUSUALL · только для разработки</p>
          <p className="display-heading text-display-page">Вышивка<br />на заказ</p>
          <div className="flex flex-wrap items-center gap-3">
            <BracketLink href="#fields">К полям формы</BracketLink>
            <BracketLink href="#process" aria-label="К этапам работы" />
          </div>
        </div>
      </div>
      <SectionDivider />
      <SampleSection id="choices" title="Выбор">
        <CategoryFilter name="demo-category" legend="Категории изделий" options={categories} defaultValue="all" />
        <GarmentTypePicker name="demo-garment" legend="Тип изделия" options={garments} defaultValue="hoodie" />
      </SampleSection>
      <SectionDivider />
      <SampleSection id="fields" title="Поля и состояния">
        <form className="space-y-6">
          <FormStep number={1} title="Добавь свой дизайн">
            <DemoUpload />
          </FormStep>
          <FormStep number={2} title="Укажи детали">
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField id="demo-size" label="Размер" defaultValue="m">
                <option value="m">M</option>
                <option value="l">L</option>
              </SelectField>
              <SelectField id="demo-placement" label="Расположение вышивки" defaultValue="back" disabled>
                <option value="back">На спине</option>
              </SelectField>
            </div>
          </FormStep>
          <FormStep number={3} title="Комментарий">
            <Textarea id="demo-comment" label="Комментарий" hideLabel placeholder="Дополнительные пожелания (необязательно)" />
          </FormStep>
          <FormStep number={4} title="Контакты">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField id="demo-name" label="Имя" autoComplete="name" placeholder="Имя" />
              <TextField id="demo-phone" label="Телефон" type="tel" autoComplete="tel" placeholder="Телефон" error="Укажите номер телефона." />
            </div>
          </FormStep>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <BracketButton type="reset" arrow={false}>Сбросить поля</BracketButton>
            <BracketButton pending>Отправляем…</BracketButton>
            <p className="text-sm text-success">Пример состояния успеха</p>
          </div>
        </form>
      </SampleSection>
      <SectionDivider />
      <SampleSection id="process" title="Как мы работаем">
        <ProcessSteps steps={["Разрабатываем дизайн", "Готовим к вышивке", "Вышиваем на оборудовании", "Создаём готовую вещь"]} />
        <BenefitsGrid items={benefits} />
        <div className="relative aspect-[3/1] overflow-hidden rounded-card border border-line lg:max-w-xl">
          <Image src="/images/process/embroidery-machine.webp" alt="Игла вышивальной машины над тканью"
            fill sizes="(min-width: 1024px) 576px, 92vw" className="object-cover object-[50%_55%]" />
          <PlusMark className="absolute top-3 left-3 text-text-secondary" />
        </div>
      </SampleSection>
    </div>
  );
}
