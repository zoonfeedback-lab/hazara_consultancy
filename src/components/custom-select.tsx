"use client";

import { useEffect, useRef, useState } from "react";

type CustomSelectProps = {
  id: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
};

export function CustomSelect({
  id,
  value,
  options,
  placeholder,
  onChange,
  error,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <div ref={ref} className={`custom-select ${open ? "is-open" : ""}`}>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`custom-select-trigger ${error ? "field-error" : ""}`}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={value ? "text-navy" : "text-ink/35"}>{value || placeholder}</span>
        <svg
          className="custom-select-chevron"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6.5L8 10L12 6.5"
            stroke="#C9A84C"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div className="custom-select-menu" role="listbox" aria-labelledby={id}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`custom-select-option ${value === option ? "is-active" : ""}`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
