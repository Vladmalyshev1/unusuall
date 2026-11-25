"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Icon } from "./icon";

type FileUploadProps = {
  name: string;
  label: string;
  removeLabel: string;
  hint?: string;
  accept?: string;
  disabled?: boolean;
  required?: boolean;
  progress?: { value: number; label: string };
  error?: string;
  validateFile?: (file: File) => string | undefined;
  onFileChange?: (file: File | null) => void;
};

export function FileUpload({
  name, label, removeLabel, hint, accept, disabled, required, progress, error: externalError,
  validateFile, onFileChange,
}: FileUploadProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectionError, setError] = useState<string>();
  const error = selectionError ?? externalError;
  const description = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ");

  useEffect(() => {
    const form = inputRef.current?.form;

    function reset(event: Event) {
      queueMicrotask(() => {
        if (event.defaultPrevented) return;
        inputRef.current?.setCustomValidity("");
        setFile(null);
        setError(undefined);
        onFileChange?.(null);
      });
    }

    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, [onFileChange]);

  function selectFile(input: HTMLInputElement) {
    const selected = input.files?.[0] ?? null;
    const nextError = selected ? validateFile?.(selected) : undefined;
    const nextFile = nextError ? null : selected;

    if (nextError) input.value = "";
    input.setCustomValidity(nextError ?? "");
    setError(nextError);
    setFile(nextFile);
    onFileChange?.(nextFile);
  }

  function removeFile() {
    const input = inputRef.current;
    if (!input) return;

    input.value = "";
    selectFile(input);
    input.focus();
  }

  return (
    <div className="min-w-0">
      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          className="ui-upload-input sr-only"
          type="file"
          name={name}
          accept={accept}
          disabled={disabled}
          required={required}
          aria-labelledby={`${id}-label`}
          aria-invalid={error ? true : undefined}
          aria-describedby={description || undefined}
          onChange={(event) => selectFile(event.currentTarget)}
        />
        <label htmlFor={id} className="ui-upload">
          <Icon name="upload" />
          <span id={`${id}-label`} className="text-xs font-semibold tracking-signature uppercase">{label}</span>
          {hint && <span id={`${id}-hint`} className="text-xs text-text-muted">{hint}</span>}
        </label>
      </div>
      <div className="ui-file-status" aria-live="polite">
        {file && <span className="min-w-0 wrap-anywhere">{file.name}</span>}
        {error && <p id={`${id}-error`} className="text-error">{error}</p>}
      </div>
      {(file || error) && (
        <button type="button" className="ui-file-remove" disabled={disabled} onClick={removeFile}>
          <Icon name="close" />
          {removeLabel}
        </button>
      )}
      {progress && <progress className="mt-2 block w-full" value={progress.value} max={100} aria-label={progress.label} />}
    </div>
  );
}
