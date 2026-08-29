"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowLeft,
  Users,
  BookOpen,
  HeartPulse,
  Shield,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { SCHOOL } from "@/data/school";
import { TransitionLink, useTransitionNav } from "@/components/ui/page-transition";

const roles = [
  { id: "siswa", label: "Siswa", short: "Siswa", icon: Users, grad: "from-lime-500 to-green-500", route: "/dashboard/ortu", desc: "Lihat nilai, jadwal & catatanmu" },
  { id: "guru", label: "Guru", short: "Guru", icon: BookOpen, grad: "from-teal-500 to-emerald-500", route: "/dashboard/guru", desc: "Input nilai, presensi & rekap" },
  { id: "bk", label: "BK", short: "Guru BK", icon: HeartPulse, grad: "from-amber-400 to-orange-500", route: "/dashboard/bk", desc: "Kelola kasus & konseling" },
  { id: "admin", label: "Admin", short: "Admin", icon: Shield, grad: "from-[#14532d] to-[#166534]", route: "/admin", desc: "Kontrol penuh sistem" },
];

const credentials = {
  siswa: { placeholder: "NIS: 2023001" },
  guru: { placeholder: "NIP: 19850012" },
  bk: { placeholder: "NIP: 19820007" },
  admin: { placeholder: "Username: admin" },
};

export function LoginPage() {
  const { navigate } = useTransitionNav();
  const [role, setRole] = useState("siswa");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [shake, setShake] = useState(false);
  const [validUsername, setValidUsername] = useState(false);

  const active = roles.find((r) => r.id === role);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Mohon isi username dan password.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const target = roles.find((r) => r.id === role);
      navigate(target.route);
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Left panel - branding (desktop) */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-green-600 via-purple-600 to-teal-500 lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "absolute inset-0 flex flex-col justify-between p-12",
              active?.grad === "from-[#14532d] to-[#166534]" ? "bg-gradient-to-br" : "bg-gradient-to-br"
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br",
                active?.grad
              )}
            />
            <div className="relative">
              <div className="flex items-center gap-3 text-white">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/95 p-1.5 shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SCHOOL.logo}
                    alt={SCHOOL.logoAlt}
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                </div>
                <span className="min-w-0 font-display text-xl font-bold">
                  {SCHOOL.name}
                </span>
              </div>
              <motion.h2
                key={`${role}-title`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-16 font-display text-4xl font-bold leading-tight text-white"
              >
                Selamat datang,<br />area <span className="font-bold">{active.short}.</span>
              </motion.h2>
              <motion.p
                key={`${role}-desc`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-4 max-w-sm text-lg text-white/85"
              >
                {active.desc}
              </motion.p>
            </div>
            <div className="relative mb-4">
              <div className="rounded-3xl bg-white/15 p-4 backdrop-blur-md">
                <p className="text-sm text-white/90">
                  &ldquo;Sekarang memantau perkembangan anak jadi jauh lebih mudah.&rdquo;
                </p>
                <p className="mt-2 text-sm font-semibold text-white">Bu Sari — Orang Tua</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right panel - form */}
      <div className="relative flex w-full flex-col overflow-hidden lg:w-1/2">
        {/* Animated glass-mesh backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-green-400/25 blur-3xl dark:bg-green-500/15" />
          <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-teal-400/25 blur-3xl dark:bg-teal-500/15" />
          <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />
        </div>

        <div className="flex items-center justify-between p-5">
          <TransitionLink href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Kembali
          </TransitionLink>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8">
          <div className="w-full max-w-md rounded-3xl border border-white/50 bg-white/40 p-6 shadow-lg2 backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-white/[0.05]">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl font-bold"
            >
              Masuk akun Anda
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-2 text-slate-500 dark:text-slate-400"
            >
              Pilih peran Anda, lalu masukkan kredensial.
            </motion.p>

            {/* Role selector */}
            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {roles.map((r) => {
                const isActive = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRole(r.id);
                      setUsername("");
                      setPassword("");
                      setError("");
                    }}
                    aria-pressed={isActive}
                    className={cn(
                      "relative flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all duration-200 focus-ring",
                      "hover:-translate-y-0.5 active:scale-[0.98]",
                      isActive
                        ? "border-green-500/70 bg-green-500/[0.08] shadow-lg2 shadow-green-500/10 dark:border-green-500/50 dark:bg-green-500/[0.12]"
                        : "border-slate-200 bg-white/50 hover:border-green-400/60 hover:bg-green-500/[0.05] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        aria-hidden="true"
                        layoutId="role-active-card"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-inset ring-green-500/70 shadow-[0_0_26px_-6px_rgba(22,163,74,0.55)]"
                      />
                    )}
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200",
                        isActive
                          ? `bg-gradient-to-br scale-110 text-white shadow-md ${r.grad}`
                          : "bg-slate-200/70 text-slate-500 dark:bg-white/10 dark:text-slate-300"
                      )}
                    >
                      <r.icon className="h-5 w-5" />
                    </div>
                    <span
                      className={cn(
                        "relative text-xs font-semibold",
                        isActive
                          ? "text-green-700 dark:text-green-300"
                          : "text-slate-600 dark:text-slate-300"
                      )}
                    >
                      {r.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <motion.form
              onSubmit={handleSubmit}
              animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : {}}
              transition={{ duration: 0.45 }}
              className="mt-8 space-y-4"
            >
              <Input
                label="Username"
                icon={Mail}
                type="text"
                floating={false}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setValidUsername(!!e.target.value);
                }}
                placeholder={credentials[role].placeholder}
                error={error && !username ? error : undefined}
                success={validUsername && !error}
              />
              <Input
                label="Password"
                icon={Lock}
                type="password"
                floating={false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
              />

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="font-medium text-green-600 transition-colors hover:text-green-500 dark:text-green-400"
                >
                  Lupa password?
                </button>
              </div>

              <Button type="submit" size="lg" loading={loading} className="w-full">
                <LogIn className="h-5 w-5" /> Masuk
              </Button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Reset modal */}
      <AnimatePresence>
        {showReset && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setShowReset(false)} />
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl dark:bg-[#0b2413]"
            >
              <h3 className="font-display text-xl font-bold">Atur ulang password</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Masukkan email terdaftar untuk menerima tautan reset.
              </p>
              <div className="mt-5">
                <Input label="Email" icon={Mail} type="email" floating={false} placeholder="nama@email.com" />
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setShowReset(false)}>
                  Batal
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setShowReset(false);
                  }}
                >
                  Kirim Tautan
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
