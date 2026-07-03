import { useEffect, useRef, useState } from "react";

interface MeasuredSize {
  width: number;
  height: number;
}

export function useMeasuredElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const rafRef = useRef(0);
  const timeoutRef = useRef<number[]>([]);
  const [size, setSize] = useState<MeasuredSize>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const applyMeasuredSize = () => {
      const rect = element.getBoundingClientRect();
      const width = Math.max(0, Math.floor(rect.width));
      const height = Math.max(0, Math.floor(rect.height));

      setSize((current) =>
        current.width === width && current.height === height ? current : { width, height }
      );
    };

    const scheduleResize = () => {
      window.cancelAnimationFrame(rafRef.current);
      timeoutRef.current.forEach((timer) => window.clearTimeout(timer));
      timeoutRef.current = [];

      rafRef.current = window.requestAnimationFrame(applyMeasuredSize);
      timeoutRef.current = [120, 320].map((delay) => window.setTimeout(applyMeasuredSize, delay));
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleResize);

    resizeObserver?.observe(element);
    scheduleResize();

    window.addEventListener("resize", scheduleResize, { passive: true });
    window.addEventListener("orientationchange", scheduleResize);
    window.visualViewport?.addEventListener("resize", scheduleResize, { passive: true });
    window.visualViewport?.addEventListener("scroll", scheduleResize, { passive: true });

    return () => {
      resizeObserver?.disconnect();
      window.cancelAnimationFrame(rafRef.current);
      timeoutRef.current.forEach((timer) => window.clearTimeout(timer));
      timeoutRef.current = [];
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("orientationchange", scheduleResize);
      window.visualViewport?.removeEventListener("resize", scheduleResize);
      window.visualViewport?.removeEventListener("scroll", scheduleResize);
    };
  }, []);

  return { ref, size };
}
