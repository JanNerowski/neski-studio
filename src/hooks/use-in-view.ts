import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  once?: boolean;
  margin?: string;
  threshold?: number;
};

export function useInView({
  once = true,
  margin = "-60px",
  threshold = 0.12,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin, threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, margin, threshold]);

  return { ref, inView };
}
