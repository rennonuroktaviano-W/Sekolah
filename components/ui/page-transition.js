"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Mesin status navigasi terpusat.
//
// Fase:
//   loading     -> layar loading awal sedang aktif (aset utama dimuat).
//   idle        -> halaman siap (after initial loading).
//   leaving     -> animasi keluar halaman lama berjalan.
//   navigating  -> router sedang memindahkan route.
//   entering    -> halaman tujuan menjalankan animasi masuk.
//   ready       -> halaman tujuan siap digunakan.
//   error       -> navigasi gagal, UI dipulihkan.
//
// Hanya "idle" dan "ready" yang menerima interaksi. Semua fase lain mengunci
// navigasi (klik diabaikan, tidak di-queue, tidak diputar ulang).
// ---------------------------------------------------------------------------

const TransitionContext = createContext(null);

const INTERACTIVE = new Set(["idle", "ready"]);

// Ruang lingkup besar aplikasi. Perpindahan di dalam area dashboard yang sama
// (contoh: /dashboard/ortu/nilai -> /dashboard/ortu/jadwal) TIDAK boleh
// memicu transisi global — sidebar/header tetap diam, hanya konten kanan
// yang diganti (dianimasikan oleh transisi internal dashboard).
function getScope(pathname) {
  if (pathname === "/" || pathname === "/login") return "landing";
  if (pathname === "/dashboard/ortu" || pathname.startsWith("/dashboard/ortu/")) return "dash-ortu";
  if (pathname === "/dashboard/guru" || pathname.startsWith("/dashboard/guru/")) return "dash-guru";
  if (pathname === "/dashboard/bk" || pathname.startsWith("/dashboard/bk/")) return "dash-bk";
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return "dash-admin";
  return "other";
}
const DASH_SCOPES = new Set(["dash-ortu", "dash-guru", "dash-bk", "dash-admin"]);

const EXIT_MS = 240; // lama keluar halaman lama (curtain in + geser kiri)
const CURTAIN_MS = 220; // lama curtain menutup/membuka
const ENTER_SETTLE_MS = 320; // fallback: halaman baru "menetap" -> ready
const NAVIGATE_MAX_MS = 8000; // batas aman tunggu route tujuan
const LOADING_MAX_MS = 2500; // batas aman initial loading
const REDUCED_SETTLE_MS = 80; // settling instan saat reduced-motion

const easePremium = [0.22, 1, 0.36, 1];
// Hanya translate/opacity — tanpa scale agar halaman besar tidak
// di-raster ulang tiap frame selama transisi.
const exitTarget = { x: -28, opacity: 0 };
const enterTarget = { x: 0, opacity: 1 };
const FROM_RIGHT = { x: 28, opacity: 0 };
const FROM_LEFT = { x: -28, opacity: 0 };

export function PageTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState("ready");
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  // Refs dipakai seluruh guard/lock agar tidak terkena stale closure.
  const phaseRef = useRef("ready");
  const pathnameRef = useRef(pathname);
  const prevPathnameRef = useRef(pathname);
  const dirRef = useRef(1); // 1 = maju (dari kanan), -1 = mundur (dari kiri)
  const pendingHrefRef = useRef(null);
  const reducedRef = useRef(false);
  const overflowPrevRef = useRef("");
  const fallbackRef = useRef(null);

  // Jaga pathnameRef selalu sinkron.
  if (pathnameRef.current !== pathname) pathnameRef.current = pathname;

  // Deteksi navigasi internal dashboard: pathname berubah tetapi scope
  // dashboard tetap sama -> bukan perpindahan layout besar. Wrapper konten
  // global tidak boleh di-remount/dianimasikan; hanya area konten kanan yang
  // dianimasikan oleh DashboardContentTransition.
  const prevNavPathnameRef = useRef(pathname);
  const internalScope = getScope(pathname);
  const isInternalNav =
    prevNavPathnameRef.current !== pathname &&
    DASH_SCOPES.has(internalScope) &&
    internalScope === getScope(prevNavPathnameRef.current);
  prevNavPathnameRef.current = pathname;
  // Semua path di dalam dashboard selalu memakai wrapper "dashboard-stable",
  // sehingga pergantian section tidak pernah me-remount layout dashboard.
  const scopeIsDash = DASH_SCOPES.has(getScope(pathname));

  const transitionTo = useCallback((next) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const clearFallback = useCallback(() => {
    if (fallbackRef.current !== null) {
      clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }
  }, []);

  // Satu-satunya timer aktif per fase (rantai berurutan, tidak paralel).
  const armFallback = useCallback(
    (ms, fn) => {
      clearFallback();
      fallbackRef.current = setTimeout(() => {
        fallbackRef.current = null;
        fn();
      }, ms);
    },
    [clearFallback]
  );

  // prefers-reduced-motion (listener dipasang sekali, dengan cleanup).
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    setReduced(mq.matches);
    const onChange = (e) => {
      reducedRef.current = e.matches;
      setReduced(e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      clearFallback();
      if (overflowPrevRef.current) {
        document.body.style.overflow = overflowPrevRef.current;
        overflowPrevRef.current = "";
      }
    };
  }, [clearFallback]);

  // Arah masuk untuk back/forward browser.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onPop = () => {
      if (!INTERACTIVE.has(phaseRef.current)) return;
      dirRef.current = -1;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Pulihkan UI bila navigasi gagal/macet (pastikan tidak ada layar tertutup).
  const recoverNav = useCallback(() => {
    clearFallback();
    pendingHrefRef.current = null;
    setOverlayVisible(false);
    if (overflowPrevRef.current) {
      document.body.style.overflow = overflowPrevRef.current;
      overflowPrevRef.current = "";
    }
    transitionTo("ready");
  }, [clearFallback, transitionTo]);

  // Selesai masuk: kunci dibuka, overlay dibuang, scroll dikembalikan.
  const finishEnter = useCallback(() => {
    if (phaseRef.current !== "entering") return;
    clearFallback();
    setOverlayVisible(false);
    if (overflowPrevRef.current) {
      document.body.style.overflow = overflowPrevRef.current;
      overflowPrevRef.current = "";
    }
    transitionTo("ready");
  }, [clearFallback, transitionTo]);

  // Setelah halaman tujuan dipasang, jalankan animasi masuk & jadwalkan ready.
  const enterSettle = useCallback(() => {
    armFallback(reducedRef.current ? REDUCED_SETTLE_MS : ENTER_SETTLE_MS, () => {
      if (phaseRef.current === "entering") finishEnter();
    });
  }, [armFallback, finishEnter]);

  // Dipanggil dari ref wrapper per-rute: menandakan "halaman aktif terpasang".
  // Ini adalah sinyal kesiapan halaman tujuan yang sebenarnya (bukan URL saja).
  const handlePageMount = useCallback(
    (node) => {
      if (!node) return; // unmount — abaikan (misal remount StrictMode)
      const ph = phaseRef.current;

      if (ph === "navigating") {
        // Navigasi kita sendiri: route baru sudah terpasang -> masuk.
        prevPathnameRef.current = pathnameRef.current;
        setFirstRender(false);
        transitionTo("entering");
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        enterSettle();
      } else if (ph === "entering" || ph === "leaving" || ph === "loading") {
        // Proses lain sedang berjalan / remount dev — jangan tabrakan.
      } else {
        // ready/idle: mount awal halaman, atau navigasi browser (back/forward/URL).
        if (prevPathnameRef.current !== pathnameRef.current) {
          prevPathnameRef.current = pathnameRef.current;
          setFirstRender(false);
          transitionTo("entering");
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          enterSettle();
        } else {
          setFirstRender(false); // mount pertama (hard load)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [enterSettle, transitionTo]
  );

  // Mount wrapper internal dashboard (key stabil): tidak boleh mengubah fase,
  // tidak ada scroll, tidak mengunci interaksi — konten dianimasikan oleh
  // DashboardContentTransition di dalam layout dashboard.
  const handleStableMount = useCallback((node) => {
    if (!node) return;
    // Safety net: dashboard sekarang punya scroll container sendiri, jadi body
    // tidak boleh dibiarkan terkunci overflow dari transisi global mana pun.
    if (overflowPrevRef.current) {
      document.body.style.overflow = overflowPrevRef.current;
      overflowPrevRef.current = "";
    }
    if (phaseRef.current === "ready" || phaseRef.current === "idle") {
      setFirstRender(false);
    }
  }, []);

  // router.push tepat SATU kali; jika macet lama, UI dipulihkan.
  const performPush = useCallback(() => {
    const href = pendingHrefRef.current;
    if (!href) return; // sudah ditangani / dibatalkan
    pendingHrefRef.current = null;
    try {
      router.push(href);
      armFallback(NAVIGATE_MAX_MS, () => {
        if (phaseRef.current === "navigating") recoverNav();
      });
    } catch (err) {
      console.error("Navigasi gagal:", err);
      recoverNav();
    }
  }, [router, armFallback, recoverNav]);

  // API publik: satu-satunya jalur navigasi aplikasi.
  const navigate = useCallback(
    (href) => {
      if (typeof href !== "string" || !href) return;
      let targetPath = href;
      try {
        targetPath = new URL(href, window.location.href).pathname;
      } catch {
        /* tetap pakai href mentah */
      }
      if (targetPath === pathnameRef.current) return; // halaman yang sama
      if (!INTERACTIVE.has(phaseRef.current)) return; // kunci global

      const toScope = getScope(targetPath);
      const fromScope = getScope(pathnameRef.current);
      if (DASH_SCOPES.has(fromScope) && fromScope === toScope) {
        // Navigasi internal dashboard (klik menu sidebar / tautan antar-section).
        // Tanpa curtain, tanpa kunci interaksi, tanpa global transition:
        // router langsung pindah secara SPA, konten kanan dianimasikan oleh
        // DashboardContentTransition. Layout dashboard tidak di-remount.
        try {
          router.push(href);
        } catch (err) {
          console.error("Navigasi internal gagal:", err);
        }
        return;
      }

      dirRef.current = 1;
      pendingHrefRef.current = href;
      overflowPrevRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      if (reducedRef.current) {
        // Reduced-motion: tetap satu navigasi, tanpa animasi.
        setOverlayVisible(false);
        transitionTo("navigating");
        performPush();
        return;
      }

      transitionTo("leaving");
      setOverlayVisible(true);
      armFallback(EXIT_MS + 50, () => {
        if (phaseRef.current === "leaving") {
          transitionTo("navigating");
          performPush();
        }
      });
    },
    [armFallback, performPush, transitionTo, router]
  );

  // Initial loading screen (dipendaki oleh LandingPage).
  const startLoading = useCallback(() => {
    if (phaseRef.current === "ready" || phaseRef.current === "idle") {
      transitionTo("loading");
      armFallback(LOADING_MAX_MS, () => {
        if (phaseRef.current === "loading") transitionTo("idle");
      });
    }
  }, [armFallback, transitionTo]);

  const finishLoading = useCallback(() => {
    if (phaseRef.current === "loading") {
      clearFallback();
      transitionTo("idle");
    }
  }, [clearFallback, transitionTo]);

  const busy = !INTERACTIVE.has(phase);

  const api = useMemo(
    () => ({ phase, busy, navigate, startLoading, finishLoading, reduced }),
    [phase, busy, navigate, startLoading, finishLoading, reduced]
  );

  const enterFrom = dirRef.current === -1 ? FROM_LEFT : FROM_RIGHT;
  const curtainTarget =
    phase === "leaving" || phase === "navigating" ? { x: 0 } : { x: "-100%" };

  return (
    <TransitionContext.Provider value={api}>
      <div className="relative min-h-screen" aria-busy={busy}>
        {reduced || scopeIsDash ? (
          <div
            key={reduced && !scopeIsDash ? pathname : "dashboard-stable"}
            ref={scopeIsDash && isInternalNav ? handleStableMount : handlePageMount}
            className="min-h-screen"
            style={{ pointerEvents: busy ? "none" : "auto" }}
          >
            {children}
          </div>
        ) : (
          <motion.div
            key={pathname}
            ref={handlePageMount}
            className="min-h-screen"
            style={{ pointerEvents: busy ? "none" : "auto" }}
            initial={firstRender ? false : enterFrom}
            animate={phase === "leaving" ? exitTarget : enterTarget}
            transition={
              phase === "leaving"
                ? { duration: EXIT_MS / 1000, ease: easePremium }
                : { duration: 0.42, delay: 0.12, ease: easePremium }
            }
            onAnimationComplete={() => {
              if (phaseRef.current === "entering" && !reducedRef.current) {
                finishEnter();
              }
            }}
          >
            {children}
          </motion.div>
        )}

        {/* Curtain transisi — lapisan di atas konten, di bawah loading screen. */}
        {!reduced && overlayVisible && (
          <motion.div
            key="nav-curtain"
            initial={{ x: "100%" }}
            animate={curtainTarget}
            transition={{ duration: CURTAIN_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
            className="pointer-events-auto fixed inset-0 z-[300] overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#03100a] via-[#0a3d1f] to-[#14532d]" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:44px_44px]" />
            {phase === "navigating" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 text-sm text-white backdrop-blur">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Memuat halaman…
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </TransitionContext.Provider>
  );
}

export const useTransitionNav = () => useContext(TransitionContext);

// Link yang memakai navigasi terpusat. Klik internal selalu satu arah
// (dikunci saat busy), dan handler user (mis. tutup drawer) tetap dipanggil.
export function TransitionLink({ href, className, children, onClick, ...props }) {
  const { navigate, busy } = useTransitionNav();
  const isInternalHref =
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//");

  const handleClick = (e) => {
    if (!isInternalHref) {
      onClick?.(e);
      return;
    }

    const target = e.currentTarget;
    const isModified =
      e.button !== 0 ||
      target.hasAttribute("download") ||
      target.getAttribute("target") === "_blank" ||
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey;

    if (!isModified) {
      // Satu metode navigasi: tombol/link tidak boleh melakukan navigasi sendiri.
      e.preventDefault();
      if (!busy) navigate(href);
    }

    onClick?.(e);
  };

  if (isInternalHref) {
    return (
      <Link
        href={href}
        className={className}
        onClick={handleClick}
        aria-disabled={busy || undefined}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}