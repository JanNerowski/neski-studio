import { type ElementType, type ReactNode } from "react";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
};

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, inView } = useInView();
  const reducedMotion = useReducedMotion();

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cn(
        reducedMotion
          ? className
          : cn(
              "transition-[opacity,transform,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
              inView
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-5 opacity-0 blur-[6px]",
              className,
            ),
      )}
      style={reducedMotion ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
