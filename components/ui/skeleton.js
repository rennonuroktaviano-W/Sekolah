import { cn } from "@/lib/utils";

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-slate-200/70 dark:bg-white/10",
        className
      )}
    />
  );
}

export function SkeletonCard({ className }) {
  return (
    <div className={cn("card-surface rounded-2xl p-6 space-y-4", className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-2 w-full" />
        </div>
      </div>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
