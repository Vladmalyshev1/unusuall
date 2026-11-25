"use client";

import { useCallback, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { BracketButton } from "@/components/ui/bracket-action";
import { GarmentTypePicker } from "@/components/ui/choice-group";
import { SelectField, Textarea, TextField } from "@/components/ui/fields";
import { FileUpload } from "@/components/ui/file-upload";
import { FormStep } from "@/components/ui/structured-content";

import styles from "@/app/create-order/create-order.module.css";

import {
  garments, hasReferenceSignature, placements, readOrder, referenceAccept, sizes, validateLocalReference,
  type OrderFieldErrors, type OrderRequest,
} from "./order-data";

type SubmissionResult =
  | { status: "demo-success" }
  | { status: "unavailable" }
  | { status: "error" };

type SubmitOrder = (input: { order: OrderRequest; reference: File | null }) => Promise<SubmissionResult>;

const submitOrder: SubmitOrder = async () => {
  if (process.env.NODE_ENV === "development") {
    const scenario = new URLSearchParams(window.location.search).get("orderDemo");
    if (scenario === "success" || scenario === "error") {
      await new Promise((resolve) => window.setTimeout(resolve, 650));
      return { status: scenario === "success" ? "demo-success" : "error" };
    }
  }

  return { status: "unavailable" };
};

// A client action keeps the browser from submitting the form natively before hydration.
function localAction() {}

export function OrderForm() {
  const [errors, setErrors] = useState<OrderFieldErrors>({});
  const [referenceError, setReferenceError] = useState<string>();
  const [status, setStatus] = useState<"idle" | "loading" | SubmissionResult["status"]>("idle");
  const submitting = useRef(false);
  const pending = status === "loading";
  const clearReferenceError = useCallback(() => {
    setReferenceError(undefined);
    setStatus("idle");
  }, []);

  function handleChange(event: ChangeEvent<HTMLFormElement>) {
    const field = event.target.getAttribute("name");
    if (field && Object.hasOwn(errors, field)) {
      const checked = readOrder(new FormData(event.currentTarget));
      setErrors(checked.ok ? {} : checked.errors);
    }
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const checked = readOrder(data);
    if (!checked.ok) {
      setErrors(checked.errors);
      setStatus("idle");
      const firstError = Object.keys(checked.errors)[0];
      requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus());
      return;
    }

    const referenceInput = form.elements.namedItem("reference");
    if (referenceInput instanceof HTMLInputElement && (referenceInput.validity.customError || referenceError)) {
      setStatus("idle");
      referenceInput.focus();
      return;
    }

    submitting.current = true;
    setStatus("loading");
    setErrors({});
    setReferenceError(undefined);

    const file = data.get("reference");
    const reference = file instanceof File && file.name ? file : null;
    try {
      if (reference && !(await hasReferenceSignature(reference))) {
        setReferenceError("Содержимое файла не соответствует формату PNG или JPG.");
        setStatus("idle");
        if (referenceInput instanceof HTMLInputElement) {
          requestAnimationFrame(() => referenceInput.focus());
        }
        return;
      }
      const result = await submitOrder({ order: checked.order, reference });
      setStatus(result.status);
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form action={localAction} onSubmit={handleSubmit} onChange={handleChange} noValidate>
      <fieldset className={styles.steps} disabled={pending}>
        <legend className="sr-only">Параметры заявки</legend>
        <FormStep number={1} title={<>Выбери{" "}<br className={styles.stepBreak} />тип изделия</>}>
          <GarmentTypePicker
            name="garmentType" legend="Тип изделия" options={garments} hideLegend error={errors.garmentType}
          />
        </FormStep>

        <FormStep number={2} title={<>Добавь{" "}<br className={styles.stepBreak} />свой дизайн</>}>
          <FileUpload
            name="reference" label="Загрузить файл" removeLabel="Удалить файл"
            hint="PNG, JPG · локальная проверка" accept={referenceAccept}
            validateFile={validateLocalReference} error={referenceError} onFileChange={clearReferenceError}
          />
        </FormStep>

        <FormStep number={3} title={<>Укажи{" "}<br className={styles.stepBreak} />детали</>}>
          <div className={`${styles.fieldPair} ${styles.details}`}>
            <SelectField id="order-size" name="size" label="Размер" defaultValue="" error={errors.size}>
              <option value="">Выберите размер</option>
              {sizes.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </SelectField>
            <SelectField id="order-placement" name="placement" label="Расположение вышивки"
              defaultValue="" error={errors.placement}>
              <option value="">Выберите расположение</option>
              {placements.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </SelectField>
          </div>
        </FormStep>

        <FormStep number={4} title="Комментарий">
          <Textarea id="order-comment" name="comment" label="Пожелания к вышивке" hideLabel
            placeholder="Дополнительные пожелания (необязательно)" rows={2} />
        </FormStep>

        <FormStep number={5} title="Контакты">
          <div className={styles.fieldPair}>
            <TextField id="order-name" name="name" label="Имя" placeholder="Имя" hideLabel
              autoComplete="name" required error={errors.name} />
            <TextField id="order-phone" name="phone" label="Телефон" placeholder="Телефон" hideLabel
              autoComplete="tel" type="tel" required error={errors.phone} />
          </div>
        </FormStep>
      </fieldset>

      <div className={styles.submit}>
        <BracketButton type="submit" arrow="outside" className={styles.action}
          aria-disabled={pending || undefined} aria-busy={pending || undefined}
          aria-describedby="order-submission-note">
          {pending ? "Проверяем заявку" : "Отправить заявку"}
        </BracketButton>
        <p id="order-submission-note" className={styles.note}>Отправка заявок пока недоступна</p>
        <div role="status" className={styles.status}>
          {pending && <span className="sr-only">Проверяем заявку.</span>}
          {status === "demo-success" && <p className="text-success">Тест пройден. Заявка не отправлена.</p>}
          {status === "error" && <p className="text-error">Не удалось обработать заявку. Попробуйте ещё раз.</p>}
          {status === "unavailable" && <p>Данные проверены. Заявка не отправлена.</p>}
        </div>
      </div>
    </form>
  );
}
