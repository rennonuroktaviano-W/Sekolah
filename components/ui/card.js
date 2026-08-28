import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Card({ children, className, hover, ...props }) {
  const Comp = hover ? motion.div : "div";
  const hoverProps = hover
    ? {
        whileHover: { y: -4 },
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }
    : {};
  return (
    <Comp
      {...hoverProps}
      className={cn(
        "card-surface rounded-2xl transition-shadow",
        hover && "hover:shadow-lg2",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn("px-6 pt-6 pb-4 flex items-center justify-between", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn("font-display text-base font-semibold", className)}>{children}</h3>
  );
}

export function CardContent({ children, className }) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>;
}
