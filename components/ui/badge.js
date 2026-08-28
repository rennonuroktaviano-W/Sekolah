import { cn } from "@/lib/utils";

const tones = {
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-indigo-500/20",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-300 ring-violet-500/20",
  fuchsia: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300 ring-fuchsia-500/20",
  teal: "bg-teal-500/10 text-teal-600 dark:text-teal-300 ring-teal-500/20",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-300 ring-amber-500/20",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-300 ring-rose-500/20",
  green: "bg-green-500/10 text-green-600 dark:text-green-300 ring-green-500/20",
  slate: "bg-slate-500/10 text-slate-600 dark:text-slate-300 ring-slate-500/20",
  navy: "bg-navy/10 text-navy dark:text-navy-dark ring-navy/20",
  white: "bg-white/10 text-slate-700 dark:text-white ring-white/40",
};

export function Badge({ children, tone = "indigo", className, icon: Icon }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap",
        tones[tone],
        className
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
}
