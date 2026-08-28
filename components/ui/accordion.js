"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionItem({ title, icon: Icon, children, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="card-surface overflow-hidden rounded-2xl">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-100/50 dark:hover:bg-white/5 focus-ring"
      >
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-300">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <span className="flex-1 font-display text-sm font-semibold">{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 text-slate-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className={cn("px-5 pb-5 border-t border-slate-100 dark:border-white/10 pt-4")}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
