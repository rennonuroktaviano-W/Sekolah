"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Target,
  School,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  users,
  guruStatistik,
  kelasGuru,
  distribusiNilai,
  siswaMenurun,
} from "@/data";

// recharts dimuat lazy agar tidak membebani first-load halaman.
const RadialDistChart = dynamic(() => import("@/components/charts/radial-dist"), {
  ssr: false,
  preload: true,
  loading: () => <Skeleton className="h-[200px] w-full" />,
});

const iconMap = {
  users: Users,
  chart: TrendingUp,
  progress: Target,
  school: School,
};

const toneMap = {
  indigo: { text: "text-green-600 dark:text-green-300", bg: "bg-green-500/10", ring: "ring-green-500/20" },
  teal: { text: "text-teal-600 dark:text-teal-300", bg: "bg-teal-500/10", ring: "ring-teal-500/20" },
  amber: { text: "text-amber-600 dark:text-amber-300", bg: "bg-amber-500/10", ring: "ring-amber-500/20" },
  violet: { text: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-600/10", ring: "ring-emerald-600/20" },
};

export default function GuruOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">
          Hallo, Selamat datang 👋
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Pengampu {users.guru.mapel} · Semester Ganjil 2025/2026
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {guruStatistik.map((s, i) => {
          const Icon = iconMap[s.icon];
          const t = toneMap[s.tone];
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card hover className="p-5">
                <div className="flex items-center justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${t.bg} ${t.text}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge tone="green">{s.change}</Badge>
                </div>
                <p className="mt-4 font-display text-3xl font-bold">
                  <CountUp to={s.value} />
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Class management list */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Kelas yang Diampu</CardTitle>
            <Link href="/dashboard/guru/kelas" className="text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400">
              Kelola
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {kelasGuru.map((k, i) => (
                <motion.div
                  key={k.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href="/dashboard/guru/input-nilai"
                    className="group flex items-center gap-4 rounded-2xl border border-slate-100 p-3.5 transition-all hover:border-teal-200 hover:shadow-md dark:border-white/5 dark:hover:border-teal-400/30"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 font-display font-bold text-teal-600 dark:text-teal-300">
                      {k.nama.replace("Kelas ", "")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{k.nama}</p>
                        <span className="text-xs text-slate-400">· {k.siswa} siswa</span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3">
                        <Badge tone="slate">Rata-rata {k.rataRata}</Badge>
                        <div className="flex-1 max-w-40">
                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${k.progressInput}%` }}
                              transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                              className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500"
                            />
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">{k.progressInput}% input</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Nilai</CardTitle>
            <Badge tone="teal">Kelas X RPL</Badge>
          </CardHeader>
          <CardContent>
            <RadialDistChart data={distribusiNilai} />
            <div className="mt-2 space-y-1.5">
              {distribusiNilai.map((d) => (
                <div key={d.rentang} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{d.rentang}</span>
                  <span className="font-medium">{d.jumlah} siswa</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warning students */}
      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-rose-400/10" />
        </div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Perlu Perhatian
          </CardTitle>
          <Badge tone="rose">Nilai Menurun</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {siswaMenurun.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-4 dark:border-amber-400/20 dark:bg-amber-500/5"
              >
                <div className="flex-1">
                  <p className="font-semibold">{s.nama}</p>
                  <p className="text-xs text-slate-500">{s.kelas} · {s.penurunan}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl font-bold text-rose-500">{s.nilaiSekarang}</p>
                  <p className="text-[10px] text-slate-400">Nilai ini</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
