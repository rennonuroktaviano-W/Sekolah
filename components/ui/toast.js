"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastContext = createContext({ toast: () => {} });

const config = {
  success: { icon: CheckCircle2, bar: "bg-emerald-500", ring: "ring-emerald-200 dark:ring-emerald-500/30" },
  error: { icon: XCircle, bar: "bg-rose-500", ring: "ring-rose-200 dark:ring-rose-500/30" },
  info: { icon: Info, bar: "bg-green-500", ring: "ring-green-200 dark:ring-green-500/30" },
  warning: { icon: AlertTriangle, bar: "bg-amber-500", ring: "ring-amber-200 dark:ring-amber-500/30" },
};

let id = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, type = "info", duration = 4000 }) => {
    const t = { id: ++id, title, description, type, duration };
    setToasts((prev) => [...prev, t]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== t.id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[200] flex w-full max-w-sm flex-col gap-3">
        <AnimatePresence>
          {toasts.map((t) => {
            const c = config[t.type];
            const Icon = c.icon;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={cn(
                  "pointer-events-auto relative overflow-hidden rounded-2xl bg-white dark:bg-[#0d2815] p-4 shadow-lg2 ring-1",
                  c.ring
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    className={cn(
                      "mt-0.5 h-5 w-5 shrink-0",
                      t.type === "success" && "text-emerald-500",
                      t.type === "error" && "text-rose-500",
                      t.type === "info" && "text-green-500",
                      t.type === "warning" && "text-amber-500"
                    )}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{t.title}</p>
                    {t.description && (
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {t.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: t.duration / 1000, ease: "linear" }}
                  className={cn("absolute bottom-0 left-0 h-0.5", c.bar)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
