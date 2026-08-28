"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className={
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-white/10 focus-ring " +
        (className || "")
      }
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="inline-flex"
        >
          {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
