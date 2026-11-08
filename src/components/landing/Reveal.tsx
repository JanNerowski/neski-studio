import { type ElementType, type ReactNode } from "react";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type RevealFrom = "up" | "left" | "right" | "pop";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  from?: RevealFrom;
};

const HIDDEN: Record<RevealFrom, string> = {
  up: "translate-y-16 opacity-0",
  left: "-translate-x-12 opacity-0 md:-translate-x-20",
  right: "translate-x-12 opacity-0 md:translate-x-20",
  pop: "translate-y-8 scale-90 opacity-0",
};

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  from = "up",
}: RevealProps) {
  const { ref, inView } = useInView({
    margin: "0px 0px -8% 0px",
    threshold: 0,
  });
  const reducedMotion = useReducedMotion();

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cn(
        reducedMotion
          ? className
          : cn(
              "transition-[opacity,translate,scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              inView ? "opacity-100" : HIDDEN[from],
              className,
            ),
      )}
      style={reducedMotion || !delay ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
