"use client";

import { FileUpload } from "@/components/ui/file-upload";

export function DemoUpload() {
  return (
    <FileUpload
      name="demo-reference"
      label="Загрузить файл"
      removeLabel="Удалить файл"
      hint="Демо: PNG, JPG · до 1 МБ"
      accept="image/png,image/jpeg"
      validateFile={(file) => {
        if (file.type !== "image/png" && file.type !== "image/jpeg") return "Выберите PNG или JPG.";
        if (file.size > 1024 * 1024) return "Размер файла превышает 1 МБ.";
      }}
    />
  );
}
