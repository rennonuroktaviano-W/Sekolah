"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-gradient-to-br from-green-500 to-emerald-700 text-white shadow-lg2 shadow-green-500/25 hover:shadow-green-500/40 hover:brightness-110",
  secondary:
    "bg-slate-900/5 dark:bg-white/10 text-slate-800 dark:text-slate-100 hover:bg-slate-900/10 dark:hover:bg-white/15 border border-slate-900/10 dark:border-white/10",
  ghost:
    "text-slate-600 dark:text-slate-300 hover:bg-slate-900/5 dark:hover:bg-white/10",
  outline:
    "border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10",
  danger:
    "bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-lg2 shadow-rose-500/25 hover:brightness-110",
};

const sizes = {
  sm: "text-sm px-3.5 py-2 rounded-xl gap-1.5",
  md: "text-sm px-5 py-2.5 rounded-2xl gap-2",
  lg: "text-base px-6 py-3.5 rounded-2xl gap-2",
  icon: "p-2.5 rounded-xl",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  whileTap = { scale: 0.97 },
  ...props
}) {
  return (
    <motion.button
      whileTap={disabled || loading ? undefined : whileTap}
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-ring active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 select-none",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
