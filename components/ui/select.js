"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Select({ label, options, className, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">
          {label}
        </label>
      )}
      <select
        className={cn(
          "w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] px-4 py-3 text-sm transition-all focus-ring dark:text-slate-100",
          className
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-white text-slate-900">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Toggle({ checked, onChange, label, tone = "indigo" }) {
  const tones = {
    indigo: "bg-green-500",
    teal: "bg-teal-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    violet: "bg-emerald-600",
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 focus-ring",
        checked ? tones[tone] : "bg-slate-300 dark:bg-white/15"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "inline-block h-5 w-5 rounded-full bg-white shadow-md",
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}
