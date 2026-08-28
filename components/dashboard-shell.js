"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Menu, X, LayoutDashboard, LogOut, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { notifikasi } from "@/data";

const ACCENT_STYLES = {
  indigo: {
    text: "text-green-600 dark:text-green-300",
    active: "bg-green-500/10 text-green-600 dark:text-green-300",
    grad: "from-green-500 to-emerald-700",
  },
  teal: {
    text: "text-teal-600 dark:text-teal-300",
    active: "bg-teal-500/10 text-teal-600 dark:text-teal-300",
    grad: "from-teal-500 to-emerald-500",
  },
  amber: {
    text: "text-amber-600 dark:text-amber-300",
    active: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
    grad: "from-amber-400 to-orange-500",
  },
  navy: {
    text: "text-navy dark:text-green-300",
    active: "bg-navy/10 text-navy dark:text-green-300",
    grad: "from-[#14532d] to-[#166534]",
  },
  violet: {
    text: "text-emerald-700 dark:text-emerald-300",
    active: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-300",
    grad: "from-emerald-600 to-lime-500",
  },
};

export function DashboardShell({ user, role, accent = "indigo", accentName, navItems, children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const styles = ACCENT_STYLES[accent];

  const NavContent = ({ mobile }) => (
    <div className="flex h-full flex-col">
      <div className={cn("flex items-center gap-2.5 px-5", mobile ? "py-4" : "py-6")}>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white", styles.grad)}>
          <LayoutDashboard className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display text-sm font-bold leading-tight">{accentName}</p>
          <p className={cn("text-[11px]", styles.text)}>{role}</p>
        </div>
      </div>

      <div className="no-scrollbar flex-1 space-y-1 overflow-y-auto px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobile && setMobileOpen(false)}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? styles.active
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={`nav-active-${accent}-${mobile ? "m" : "d"}`}
                  className="absolute left-0 h-6 w-1 rounded-r-full bg-current opacity-60"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="border-t border-slate-100 p-3 dark:border-white/10">
        <div className="flex items-center gap-3 rounded-2xl bg-slate-100/70 p-3 dark:bg-white/[0.04]">
          <Avatar name={user?.name} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs text-slate-400">{user?.subtitle}</p>
          </div>
          <button className="rounded p-1 text-slate-400 transition-colors hover:text-rose-500 focus-ring">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200/70 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02] lg:flex">
        <NavContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl dark:bg-[#052e16] lg:hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 focus-ring"
              >
                <X className="h-5 w-5" />
              </button>
              <NavContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-white/70 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#081510]/70 lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 lg:hidden focus-ring"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Cari..."
              className="h-10 w-56 rounded-xl border border-slate-200 bg-white/60 pl-9 pr-3 text-sm transition-all dark:border-white/10 dark:bg-white/[0.03] dark:text-white focus-ring"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <div className="relative">
              <button
                onClick={() => setNotifOpen((o) => !o)}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/10 focus-ring"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500">
                  <motion.span
                    animate={{ scale: [1, 1.6, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 rounded-full bg-rose-500/60"
                  />
                </span>
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute right-0 top-12 w-80 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg2 dark:border-white/10 dark:bg-[#0b2413]"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-white/10">
                      <p className="font-display text-sm font-semibold">Notifikasi</p>
                      <Badge tone="rose">{notifikasi.filter((n) => n.unread).length} baru</Badge>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifikasi.map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            "flex gap-3 border-b border-slate-50 px-4 py-3 transition-colors hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5",
                            n.unread && "bg-green-50/40 dark:bg-green-500/5"
                          )}
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium">{n.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{n.desc}</p>
                            <p className="mt-1 text-[10px] text-slate-400">{n.time}</p>
                          </div>
                          {n.unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500" />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 lg:px-8 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            key={pathname}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-slate-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#052e16]/90 lg:hidden">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[10px] transition-colors",
                isActive ? styles.text : "text-slate-400"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="max-w-16 truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
