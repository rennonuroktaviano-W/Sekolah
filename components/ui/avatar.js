import { cn } from "@/lib/utils";

const gradients = [
  "from-green-500 to-emerald-700",
  "from-rose-500 to-orange-400",
  "from-teal-500 to-emerald-500",
  "from-sky-500 to-green-500",
  "from-lime-500 to-lime-500",
];

export function Avatar({ name, src, size = "md", className, gradient }) {
  const sizes = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
    xl: "h-20 w-20 text-2xl",
  };
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  let hash = 0;
  for (let i = 0; i < (name || "?").length; i++) hash = (hash * 31 + name.charCodeAt(i)) % 5;
  const g = gradients[hash];

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold text-white select-none",
        sizes[size],
        src ? undefined : `bg-gradient-to-br ${g}`,
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}
