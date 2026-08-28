"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Tabs({ tabs, active, onChange, className, centered }) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-1 rounded-2xl bg-slate-100/80 dark:bg-white/[0.05] p-1.5",
        centered && "justify-center",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 focus-ring",
              isActive
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="tab-active"
                className="absolute inset-0 rounded-xl bg-white dark:bg-white/15 shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-1.5">
              {tab.icon && <tab.icon className="h-4 w-4" />}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
