"use client";

import { useEffect, useRef, useState } from "react";

type CountUpStatProps = {
  value: number;
  suffix?: string;
  label: string;
};

export function CountUpStat({ value, suffix = "", label }: CountUpStatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        const start = performance.now();
        const duration = 1200;

        const frame = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));

          if (progress < 1) {
            requestAnimationFrame(frame);
          }
        };

        requestAnimationFrame(frame);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="px-5 py-4 text-center md:px-8">
      <div className="display-title text-4xl text-gold md:text-5xl">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d7deec]">
        {label}
      </div>
    </div>
  );
}
