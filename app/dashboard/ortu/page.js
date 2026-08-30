"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  ChevronDown,
  FileDown,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ProgressRing } from "@/components/ui/progress-ring";
import { CountUp } from "@/components/ui/count-up";
import { AccordionItem } from "@/components/ui/accordion";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  users,
  nilaiSemester,
  kehadiran,
  jadwalPelajaran,
  catatanBK,
  achievements,
  pengumuman,
} from "@/data";

// recharts dimuat lazy agar tidak membebani first-load halaman.
const TrendAreaChart = dynamic(() => import("@/components/charts/trend-area"), {
  ssr: false,
  preload: true,
  loading: () => <Skeleton className="h-[200px] w-full" />,
});

const statusColors = {
  naik: { color: "#10b981", icon: TrendingUp, label: "Naik" },
  turun: { color: "#f43f5e", icon: TrendingDown, label: "Turun" },
  stabil: { color: "#22c55e", icon: Minus, label: "Stabil" },
};

const khadirColors = {
  hadir: "bg-emerald-500",
  izin: "bg-sky-400",
  sakit: "bg-amber-400",
  alpa: "bg-rose-500",
};

const khadirLabels = { hadir: "Hadir", izin: "Izin", sakit: "Sakit", alpa: "Alpa" };

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Selamat pagi";
  if (h < 15) return "Selamat siang";
  if (h < 19) return "Selamat sore";
  return "Selamat malam";
}

export default function OrtuOverview() {
  const [childIdx, setChildIdx] = useState(0);
  const [exportOpen, setExportOpen] = useState(false);
  const child = users.ortu.children[childIdx];
  const nilai = nilaiSemester.current;

  return (
    <div className="space-y-6">
      {/* Personal header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-surface relative overflow-hidden rounded-3xl p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-600/20 to-lime-500/10 blur-2xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={child.name} size="lg" />
            <div>
              <h1 className="font-display text-2xl font-bold">
                {getGreeting()} <span>👋</span>
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <p className="text-sm text-slate-500 dark:text-slate-400">{child.name}</p>
                <Badge tone="violet">{child.class}</Badge>
                <Badge tone="slate">Wali: {child.waliKelas}</Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Child switcher */}
            {users.ortu.children.length > 1 && (
              <div className="relative">
                <DetailChildSwitcher
                  options={users.ortu.children}
                  value={childIdx}
                  onChange={setChildIdx}
                />
              </div>
            )}
            <Button variant="secondary" onClick={() => setExportOpen(true)}>
              <Download className="h-4 w-4" /> Export Rapor
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Switch key on child change */}
      <div key={child.id}>
        {/* Overview cards row */}
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">Rata-rata Nilai</p>
            <div className="mt-3 flex items-center gap-4">
              <ProgressRing value={nilai.rataRata} size={96} stroke={9} color="#10b981">
                <span className="font-display text-xl font-bold">{nilai.rataRata}</span>
              </ProgressRing>
              <div>
                <p className="text-xs text-slate-400">{nilai.semester}</p>
                <Badge tone="green" className="mt-2">▲ +4.3 dari sem. lalu</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">Kehadiran Bulan Ini</p>
            <div className="mt-3 flex items-center gap-4">
              <ProgressRing value={kehadiran.persentase} size={96} stroke={9} color="#10b981">
                <span className="font-display text-xl font-bold">{kehadiran.persentase}%</span>
              </ProgressRing>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {kehadiran.ringkasan.hadir} hari hadir dari total aktif
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">Prestasi</p>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 text-3xl">🏆</div>
              <div>
                <p className="font-display text-2xl font-bold">{achievements.length} Badge</p>
                <p className="text-xs text-slate-400">3 pencapaian baru bulan ini</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Trend chart + per-mapel */}
        <div className="mt-6 grid gap-5 lg:grid-cols-5">
          {/* Trend chart */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Tren Nilai Semester</CardTitle>
              <Badge tone="violet">{nilai.semester}</Badge>
            </CardHeader>
            <CardContent>
              <TrendAreaChart data={nilai.trend} />
            </CardContent>
          </Card>

          {/* Per-mapel short list */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Nilai per Mapel</CardTitle>
              <Link href="/dashboard/ortu/nilai" className="text-sm font-medium text-emerald-700 hover:text-emerald-600 dark:text-emerald-500">
                Lihat semua
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {nilai.mapel.slice(0, 4).map((m) => {
                const st = statusColors[m.status];
                return (
                  <div key={m.id} className="flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
                    <span className="text-xl">{m.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.statusLabel}</p>
                    </div>
                    <span className="font-display font-bold">{m.nilaiAkhir}</span>
                    <st.icon className="h-4 w-4" style={{ color: st.color }} />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Lower grids */}
        <div className="mt-6">
          <div className="font-display text-lg font-semibold">Pencapaian</div>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ rotateX: 10, rotateY: -6 }}
                className="card-surface group flex flex-col items-center rounded-2xl p-4 text-center"
              >
                <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">{a.icon}</span>
                <p className="mt-2 text-xs font-medium">{a.title}</p>
                <Badge tone="slate" className="mt-2">{a.category}</Badge>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Jadwal hari ini */}
        <div className="mt-6">
          <div className="font-display text-lg font-semibold">Jadwal Hari Ini</div>
          <Card className="mt-3">
            <CardContent className="pt-5">
              <div className="space-y-3">
                {jadwalPelajaran.hari[0].kelas.map((j, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 p-3 dark:border-white/5"
                  >
                    <div className="w-20 shrink-0 text-xs font-medium text-slate-400">{j.time}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{j.mapel}</p>
                      <p className="text-xs text-slate-400">{j.guru}</p>
                    </div>
                    <Badge tone="slate">{j.ruang}</Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Export Rapor Modal */}
      <Modal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Export Rapor"
        footer={
          <>
            <Button variant="secondary" onClick={() => setExportOpen(false)}>Batal</Button>
            <Button onClick={() => { setExportOpen(false); }}><FileDown className="h-4 w-4" /> Download PDF</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-fuchsia-50 p-4 dark:from-emerald-600/10 dark:to-lime-500/10">
            <p className="font-semibold">Rapor {child.name}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
              <Badge tone="violet">{child.class}</Badge>
              <Badge tone="slate">{nilaiSemester.current.semester}</Badge>
            </div>
            <p className="mt-3 text-sm text-slate-500">Rata-rata nilai: <b>{nilaiSemester.current.rataRata}</b></p>
          </div>
          <p className="text-sm text-slate-500">Preview dokumen akan muncul setelah file siap.</p>
        </div>
      </Modal>
    </div>
  );
}

function DetailChildSwitcher({ options, value, onChange }) {
  return (
    <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-white/10">
      {options.map((o, i) => (
        <button
          key={o.id}
          onClick={() => onChange(i)}
          className={cn(
            "relative flex items-center gap-2 rounded-xl px-3 py-2 transition-colors",
            i === value ? "text-slate-900 dark:text-white" : "text-slate-400"
          )}
        >
          {i === value && (
            <motion.span
              layoutId="child-pill"
              className="absolute inset-0 rounded-xl bg-white shadow-sm dark:bg-white/15"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2 text-sm font-medium">
            <Avatar name={o.name} size="xs" />
            <span className="hidden sm:inline">{o.name.split(" ")[0]}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
