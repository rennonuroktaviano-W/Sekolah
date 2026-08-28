"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const TransitionContext = createContext({ navigate: () => {} });

const exitDuration = 430;

export function PageTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [overlay, setOverlay] = useState(false);
  const [reduced, setReduced] = useState(false);
  const pendingRef = useRef(null);
  const navigatingRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const navigate = useCallback(
    (href) => {
      if (typeof href !== "string" || !href) return;
      if (navigatingRef.current) return; // cegah navigasi ganda

      navigatingRef.current = true;

      if (reduced) {
        router.push(href);
        setTimeout(() => {
          pendingRef.current = null;
          navigatingRef.current = false;
        }, 250);
        return;
      }

      pendingRef.current = href;
      setOverlay(true);

      setTimeout(() => router.push(href), exitDuration);
      // Jaring pengaman: lepaskan guard & overlay walau pathname tak berubah.
      setTimeout(() => {
        if (pendingRef.current) {
          setOverlay(false);
          pendingRef.current = null;
          navigatingRef.current = false;
        }
      }, exitDuration + 650);
    },
    [reduced, router]
  );

  // Saat pathname berubah (navigasi selesai), tutup overlay.
  useEffect(() => {
    if (navigatingRef.current && pendingRef.current) {
      setOverlay(false);
      pendingRef.current = null;
      navigatingRef.current = false;
    }
  }, [pathname]);

  const disableTransition = reduced;

  return (
    <TransitionContext.Provider value={{ navigate, reduced }}>
      {disableTransition ? (
        children
      ) : (
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 14, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      )}

      <AnimatePresence>
        {overlay && !reduced && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{ originY: 0 }}
            className="pointer-events-none fixed inset-0 z-[300] bg-gradient-to-br from-[#14532d] via-[#166534] to-[#15803d]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

export const useTransitionNav = () => useContext(TransitionContext);

export function TransitionLink({ href, children, className, ...props }) {
  const { navigate } = useTransitionNav();

  const onClick = (e) => {
    const target = e.currentTarget;
    const isModified =
      e.defaultPrevented ||
      e.button !== 0 ||
      target.hasAttribute("download") ||
      target.getAttribute("target") === "_blank" ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey;

    const isInternal =
      typeof href === "string" &&
      href.startsWith("/") &&
      !href.startsWith("#") &&
      !href.startsWith("//");

    if (!isModified && isInternal) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <Link href={href} className={className} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
