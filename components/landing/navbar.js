"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { TransitionLink } from "@/components/ui/page-transition";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    setScrolled(window.scrollY > 24);
  }, []);

  return (
    <motion.header
      initial={false}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-white/40 bg-white/70 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#081510]/85 dark:shadow-black/40"
          : "border-transparent bg-transparent shadow-none"
      )}
    >
      <motion.nav
        initial={false}
        animate={{ height: scrolled ? 60 : 72 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <TransitionLink href="/" className="flex items-center gap-2.5">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.05 }}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 via-green-500 to-teal-400 text-white shadow-lg shadow-green-500/30"
          >
            <GraduationCap className="h-6 w-6" />
          </motion.div>
          <span className="font-display text-lg font-bold tracking-tight">
            SIAS<span className="text-gradient">.</span>
          </span>
        </TransitionLink>

        <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          {["Fitur", "Cara Kerja", "Testimoni"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(" ", "-")}`}
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <TransitionLink href="/login">
            <Button size="sm" className="hidden sm:inline-flex">
              Masuk <ArrowRight className="h-4 w-4" />
            </Button>
          </TransitionLink>
        </div>
      </motion.nav>
    </motion.header>
  );
}
