import type { IconName } from "@/components/ui/icon";

export const garments = [
  { value: "hoodie", label: "Худи", icon: "hoodie" },
  { value: "tshirt", label: "Футболка", icon: "t-shirt" },
  { value: "jacket", label: "Куртка", icon: "jacket" },
  { value: "accessory", label: "Аксессуар", icon: "cap" },
  { value: "other", label: "Другое", icon: "more" },
] as const satisfies readonly { value: string; label: string; icon: IconName }[];

// The mockups show one example per list. The approved option sets are pending.
export const sizes = [{ value: "M", label: "M" }] as const;
export const placements = [{ value: "back", label: "На спине" }] as const;

export type OrderRequest = {
  garmentType: typeof garments[number]["value"];
  size?: typeof sizes[number]["value"];
  placement?: typeof placements[number]["value"];
  comment?: string;
  name: string;
  phone: string;
  referenceUploadId?: string;
};

export type OrderFieldErrors = Partial<Record<keyof OrderRequest, string>>;

export function readOrder(formData: FormData):
  | { ok: true; order: OrderRequest }
  | { ok: false; errors: OrderFieldErrors } {
  function readText(field: keyof OrderRequest) {
    const value = formData.get(field);
    return typeof value === "string" ? value.trim() : "";
  }

  const selectedGarment = readText("garmentType");
  const garment = garments.find(({ value }) => value === selectedGarment);
  const selectedSize = readText("size");
  const size = sizes.find(({ value }) => value === selectedSize)?.value;
  const selectedPlacement = readText("placement");
  const placement = placements.find(({ value }) => value === selectedPlacement)?.value;
  const comment = readText("comment");
  const name = readText("name");
  const phone = readText("phone");
  const errors: OrderFieldErrors = {};

  if (!garment) errors.garmentType = "Выберите тип изделия.";
  if (selectedSize && !size) errors.size = "Выберите размер из списка.";
  if (selectedPlacement && !placement) errors.placement = "Выберите расположение из списка.";
  if (!name || !/\p{L}/u.test(name)) errors.name = "Введите имя.";
  if (!/^\+?(?=[\d(])(?:\d|[ .-]|\(\d+\))+(?<=[\d)])$/.test(phone) || !/\d.*\d/.test(phone)) {
    errors.phone = "Введите номер телефона с цифрами. Можно использовать +, пробелы, скобки и дефисы.";
  }

  if (!garment || Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    order: {
      garmentType: garment.value,
      size,
      placement,
      comment: comment || undefined,
      name,
      phone,
    },
  };
}

const referenceSignatures: Readonly<Record<string, readonly number[]>> = {
  "image/png": [137, 80, 78, 71, 13, 10, 26, 10],
  "image/jpeg": [255, 216, 255],
};

export const referenceAccept = Object.keys(referenceSignatures).join(",");

export function validateLocalReference(file: File) {
  if (!Object.hasOwn(referenceSignatures, file.type)) return "Для локальной проверки выберите PNG или JPG.";
  if (!file.size) return "Файл пуст. Выберите другой файл.";
}

export async function hasReferenceSignature(file: File) {
  if (validateLocalReference(file)) return false;
  const signature = referenceSignatures[file.type];
  const bytes = new Uint8Array(await file.slice(0, signature.length).arrayBuffer());
  return signature.every((byte, index) => bytes[index] === byte);
}
