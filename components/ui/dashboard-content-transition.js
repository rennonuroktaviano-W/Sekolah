"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

// Transisi INTERNAL dashboard (SPA).
//
// Dipakai untuk mengganti konten kanan saat menu sidebar diklik / back-forward.
// Sidebar, header, dan profil TIDAK ikut bergerak karena komponen ini hanya
// membungkus area konten di dalam layout dashboard. Sama sekali tidak ada
// curtain, loading screen, atau state dari page-transition global.
//
// SENG AJA TIDAK memakai <AnimatePresence mode="wait">: pola itu rawan
// "konten hilang" (halaman baru tidak pernah ter-mount saat animasi keluar
// halaman lama macet, terutama dengan React StrictMode). Di sini dipakai
// satu motion.div ber-key.
//
// "initial={false}" dipakai pada render pertama sehingga konten LANGSUNG
// tampil penuh (opacity 1) di server/hydration — tidak pernah ada kondisi
// konten pucat/gilang karena menunggu animasi JS. Di navigasi internal ke
// section lain barulah slide-in ringan berjalan.

const easePremium = [0.22, 1, 0.36, 1];

export function DashboardContentTransition({ children }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // true hanya setelah komponen ter-mount (client). Kalau false -> pakai
  // initial={false} supaya paint pertama penuh tanpa animasi masuk.
  const [mounted, setMounted] = useState(false);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Setiap ganti section, scroll container dashboard dikembalikan ke atas.
  // Sidebar/header fixed sehingga posisinya tidak terpengaruh.
  useEffect(() => {
    const main = document.getElementById("dashboard-main-scroll");
    if (main) {
      main.scrollTop = 0;
    }
  }, [pathname]);

  const animateIn = mounted && prevPathRef.current !== pathname;
  prevPathRef.current = pathname;

  return (
    <motion.div
      key={pathname}
      initial={reduced || !animateIn ? false : { opacity: 0.4, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: easePremium }}
      className="min-w-0"
    >
      {children}
    </motion.div>
  );
}
