"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, LineChart, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/ui/page-transition";

const words = ["transparan.", "efisien.", "modern.", "terpadu."];

export function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const rotateX = useTransform(scrollY, [0, 500], [0, 12]);

  useEffect(() => {
    const t = setInterval(() => {
      setWordIdx((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-green-500/25 via-green-500/20 to-teal-400/25 blur-3xl dark:from-green-500/15 dark:via-green-500/10 dark:to-teal-400/10" />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute right-[-100px] top-32 h-[400px] w-[400px] rounded-full bg-lime-500/20 blur-3xl dark:bg-lime-500/10"
        />
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          className="absolute bottom-0 left-[-80px] h-[350px] w-[350px] rounded-full bg-teal-400/20 blur-3xl dark:bg-teal-400/10"
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-green-200/60 bg-white/60 px-3 py-1.5 text-xs font-medium text-green-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-green-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Portal Akademik Digital · SMK Bakti Idhata
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Belajar jadi{" "}
            <span className="relative inline-block">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                className="text-gradient"
              >
                {words[wordIdx]}
              </motion.span>
              {words[wordIdx] === "efisien." && (
                <Sparkles className="absolute -right-7 -top-2 h-5 w-5 text-amber-400" />
              )}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-lg text-base text-slate-600 dark:text-slate-300 sm:text-lg"
          >
            Shaping <span className="font-semibold text-emerald-700 dark:text-emerald-300">Technopreneur
            School for Future</span> — satu platform untuk guru, siswa, orang tua,
            dan BK; memantau nilai, kehadiran, dan perkembangan akademik secara
            real-time dan transparan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <TransitionLink href="/login">
              <Button size="lg">
                Mulai Sekarang <ArrowRight className="h-5 w-5" />
              </Button>
            </TransitionLink>
            <a href="#fitur">
              <Button size="lg" variant="secondary">
                Jelajahi Fitur
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400"
          >
            {["Tanpa biaya fase uji", "Data terenkripsi", "Mudah digunakan"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Floating dashboard mockup */}
        <motion.div
          style={{ y, rotateX }}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative [perspective:1200px]"
        >
          <div className="relative mx-auto w-full max-w-md">
            <div className="card-surface rounded-3xl p-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Selamat datang kembali 👋</p>
                  <p className="font-display text-lg font-bold">Rata-rata Nilai Kelas</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 text-white">
                  <LineChart className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-end gap-2">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="font-display text-4xl font-bold"
                >
                  87.4
                </motion.span>
                <span className="mb-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                  ▲ 4.2%
                </span>
              </div>
              <div className="mt-4 flex h-24 items-end gap-2">
                {[40, 55, 48, 70, 62, 85, 78].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 200 }}
                    className="flex-1 rounded-lg bg-gradient-to-t from-green-500/60 to-emerald-500"
                  />
                ))}
              </div>
            </div>

            {/* Floating mini cards */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-6 top-1/3 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-[#0d2815]/90"
            >
              <p className="text-[10px] text-slate-400">Progress Input</p>
              <p className="font-display text-lg font-bold">92%</p>
              <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ delay: 1, duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500"
                />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1, ease: "easeInOut" }}
              className="absolute -right-4 bottom-10 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-[#0d2815]/90"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-300">
                  🏆
                </div>
                <div>
                  <p className="text-xs font-semibold">Prestasi Baru</p>
                  <p className="text-[10px] text-slate-400">Juara 2 Olimpiade</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
