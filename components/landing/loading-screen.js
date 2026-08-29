"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SCHOOL } from "@/data/school";
import { useTransitionNav } from "@/components/ui/page-transition";

// Penanda bahwa loading awal sudah selesai dalam sesi ini.
// Dengan begitu overlay hanya muncul saat hard refresh/muat pertama,
// tidak saat kembali ke landing via navigasi internal.
const INIT_LOADED_KEY = "sb:initial-loading-done";

export function LoadingScreen() {
  const { startLoading, finishLoading } = useTransitionNav();
  // Visible default true agar overlay ikut ter-render di SSR dan langsung
  // menghalangi klik (pointer-events) bahkan sebelum JavaScript berjalan.
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const progressRef = useRef(0);
  const reducedRef = useRef(false);
  const prevOverflowRef = useRef("");
  const completedRef = useRef(false);
  const timersRef = useRef({ tick: null, minTimer: null, safety: null, onLoad: null });

  // Bersihkan semua timer/event yang berjalan.
  const clearTimers = () => {
    const { tick, minTimer, safety, onLoad } = timersRef.current;
    if (tick) clearInterval(tick);
    if (minTimer) clearTimeout(minTimer);
    if (safety) clearTimeout(safety);
    if (onLoad) window.removeEventListener("load", onLoad);
    timersRef.current = { tick: null, minTimer: null, safety: null, onLoad: null };
  };

  // Tandai loading selesai (idempotent). State machine dibuka + overlay ditutup.
  const completeLoading = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    clearTimers();
    try {
      sessionStorage.setItem(INIT_LOADED_KEY, "1");
    } catch {
      /* private mode / storage diblokir — abaikan */
    }
    progressRef.current = 100;
    setProgress(100);
    setDone(true);
    finishLoading();
  };

  // Nyalakan interval progres + timer selesai (idempotent / aman dipanggil ulang).
  const startTimers = () => {
    clearTimers();
    const minTime = reducedRef.current ? 500 : 1500;
    const startedAt = Date.now();

    timersRef.current.tick = setInterval(() => {
      progressRef.current = Math.min(progressRef.current + Math.random() * 9 + 3, 96);
      setProgress(progressRef.current);
    }, 220);

    // Selesaikan saat aset penting siap (minimal setelah minTime), atau batas aman.
    timersRef.current.minTimer = setTimeout(completeLoading, minTime);
    timersRef.current.safety = setTimeout(completeLoading, 3500);

    const onLoad = () => {
      if (Date.now() - startedAt >= minTime) completeLoading();
    };
    timersRef.current.onLoad = onLoad;
    window.addEventListener("load", onLoad, { once: true });
  };

  useLayoutEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Skipped: sesi ini sudah pernah loading (kembali dari login, dll).
    // Overlay langsung disembunyikan sebelum paint agar tidak berkedip.
    let skipped = false;
    try {
      skipped = !!sessionStorage.getItem(INIT_LOADED_KEY);
    } catch {
      skipped = false;
    }
    if (skipped) {
      setVisible(false);
      return undefined;
    }

    // Muat pertama / hard refresh: kunci scroll, nyalakan mesin & timer.
    prevOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    startLoading(); // state machine -> loading (kunci navigasi)
    startTimers();

    return () => {
      clearTimers();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tutup loading setelah progres penuh (fade + slide halus).
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = prevOverflowRef.current || "";
    }, reducedRef.current ? 80 : 420);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ x: "0%" }}
          exit={{ x: "-100%", opacity: 0.4 }}
          transition={{ duration: reducedRef.current ? 0.1 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-label={`Memuat ${SCHOOL.name}`}
          className="pointer-events-auto fixed inset-0 z-[400] flex items-center justify-center overflow-hidden bg-[#04120c]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:44px_44px]" />
            <motion.div
              animate={reducedRef.current ? undefined : { y: [0, -36, 0], x: [0, 24, 0] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
              className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-green-500/15 blur-3xl"
            />
            <motion.div
              animate={reducedRef.current ? undefined : { y: [0, 30, 0], x: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
              className="absolute -left-28 bottom-10 h-80 w-80 rounded-full bg-teal-400/15 blur-3xl"
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                animate={
                  reducedRef.current
                    ? undefined
                    : { opacity: [0, 0.8, 0], scale: [0.6, 1.4, 0.6] }
                }
                transition={{
                  repeat: Infinity,
                  duration: 4 + i * 0.7,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                className="absolute h-1.5 w-1.5 rounded-full bg-green-300/60"
                style={{
                  left: `${18 + i * 17}%`,
                  top: `${20 + ((i * 13) % 45)}%`,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center px-6 text-center"
          >
            <div className="relative">
              <motion.div
                animate={
                  reducedRef.current
                    ? undefined
                    : { boxShadow: [
                        "0 0 0 0 rgba(34,197,94,0)",
                        "0 0 60px 6px rgba(34,197,94,0.35)",
                        "0 0 0 0 rgba(34,197,94,0)",
                      ] }
                }
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl sm:h-32 sm:w-32"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SCHOOL.logo}
                  alt={SCHOOL.logoAlt}
                  className="h-full w-full object-contain"
                  draggable={false}
                />
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              {SCHOOL.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-2 text-sm text-emerald-200/80"
            >
              {SCHOOL.slogan}
            </motion.p>

            <div className="mt-8 w-56 sm:w-64">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-300"
                />
              </div>
              <p className="mt-3 text-xs tabular-nums text-white/50">
                {Math.round(progress)}%
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}