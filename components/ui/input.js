"use client";

import { useId, useEffect, useRef, useState, forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export const Input = forwardRef(function Input(
  {
    label,
    icon: Icon,
    type = "text",
    error,
    success,
    className,
    floating = true,
    ...props
  },
  ref
) {
  const id = useId();
  const innerRef = useRef(null);
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const [autofilled, setAutofilled] = useState(false);

  const isPassword = type === "password";
  const hasValue = !!props.value;
  const isFloating = floating && label;
  const isUp = focused || hasValue || autofilled;

  const checkAutofill = () => {
    if (innerRef.current) {
      setAutofilled(
        innerRef.current.matches(":-webkit-autofill") ||
          innerRef.current.matches(":autofill")
      );
    }
  };

  useEffect(() => {
    const t = setTimeout(checkAutofill, 350);
    return () => clearTimeout(t);
  }, []);

  const setRef = (node) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <div className="relative w-full">
      {label && !isFloating && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
        )}

        {isFloating && (
          <label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute z-10 select-none transition-all duration-200",
              Icon ? "left-11" : "left-4",
              isUp ? "top-1.5 text-[10px] font-medium" : "top-1/2 -translate-y-1/2 text-sm",
              error
                ? "text-rose-500"
                : isUp
                ? "text-green-600 dark:text-green-400"
                : "text-slate-400 dark:text-slate-400"
            )}
          >
            {label}
          </label>
        )}

        <input
          ref={setRef}
          id={id}
          type={isPassword ? (show ? "text" : "password") : type}
          onFocus={(e) => {
            setFocused(true);
            checkAutofill();
          }}
          onBlur={(e) => {
            setFocused(false);
            checkAutofill();
          }}
          onAnimationStart={(e) => {
            if (e.animationName === "onAutoFillStart") {
              setTimeout(checkAutofill, 0);
            }
          }}
          placeholder={isFloating && !isUp ? "" : props.placeholder}
          {...props}
          className={cn(
            "w-full rounded-2xl border bg-white/40 px-4 text-sm text-slate-900 backdrop-blur-md transition-all duration-200 focus-ring dark:bg-white/[0.06] dark:text-white",
            "autofill:bg-white autofill:text-slate-900 dark:autofill:bg-[#0c2414] dark:autofill:text-white",
            "[-webkit-autofill]:shadow-[inset_0_0_0_1000px_rgba(255,255,255,0.9)] [-webkit-autofill]:text-slate-900",
            "dark:[-webkit-autofill]:shadow-[inset_0_0_0_1000px_rgba(11,36,19,0.95)] dark:[-webkit-autofill]:text-white",
            "[transition:background-color_5000s_ease-in-out_0s]",
            Icon && "pl-11",
            isPassword && "pr-11",
            isFloating ? "h-14 pb-2 pt-5" : "h-12",
            error
              ? "border-rose-400 dark:border-rose-500/60"
              : success
              ? "border-emerald-400 dark:border-emerald-500/60"
              : "border-white/50 focus:border-[#16a34a] dark:border-white/15",
            className
          )}
        />

        <AnimatePresence>
          {success && !isPassword && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500"
            >
              <Check className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/70 dark:hover:text-slate-200"
            aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="ml-3 mt-1.5 text-xs text-rose-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});
