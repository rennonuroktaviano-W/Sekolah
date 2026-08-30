"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Activity,
  Users,
  FolderOpen,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { bkRingkasan, statistikPelanggaran, kasusTren, kanbanKasus } from "@/data";

// recharts dimuat lazy agar tidak membebani first-load halaman.
const PieTypeChart = dynamic(() => import("@/components/charts/pie-type"), {
  ssr: false,
  preload: true,
  loading: () => <Skeleton className="h-[240px] w-full" />,
});
const LineTrendChart = dynamic(() => import("@/components/charts/line-trend"), {
  ssr: false,
  preload: true,
  loading: () => <Skeleton className="h-[240px] w-full" />,
});

const statCards = [
  { label: "Kasus Aktif", value: bkRingkasan.kasusAktif, icon: Activity, color: "#f59e0b" },
  { label: "Siswa Dipantau", value: bkRingkasan.siswaPemantauan, icon: Users, color: "#22c55e" },
  { label: "Total Kasus", value: bkRingkasan.totalKasus, icon: FolderOpen, color: "#14b8a6" },
  { label: "Selesai Bulan Ini", value: bkRingkasan.selesaiBulanIni, icon: CheckCircle2, color: "#10b981" },
];

export default function BkOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Ringkasan BK</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Pantau kasus & pemantauan siswa secara menyeluruh</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card hover className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: `${s.color}1a`, color: s.color }}>
                  <s.icon className="h-6 w-6" />
                </div>
              </div>
              <p className="mt-4 font-display text-3xl font-bold">
                <CountUp to={s.value} />
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Pie chart */}
        <Card>
          <CardHeader>
            <CardTitle>Statistik Jenis Pelanggaran</CardTitle>
            <Badge tone="amber">Tahun ini</Badge>
          </CardHeader>
          <CardContent>
            <PieTypeChart data={statistikPelanggaran} />
          </CardContent>
        </Card>

        {/* Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Kasus per Bulan</CardTitle>
            <Badge tone="rose">Aktivitas</Badge>
          </CardHeader>
          <CardContent>
            <LineTrendChart data={kasusTren} />
          </CardContent>
        </Card>
      </div>

      {/* Cases needing attention across columns */}
      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-rose-400/10" />
        </div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Kasus Prioritas
          </CardTitle>
          <Badge tone="rose">{kanbanKasus[0].cards.filter((c) => c.keseriusan === "tinggi").length} tinggi</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {kanbanKasus[0].cards.map((c) => (
              <div key={c.id} className="rounded-2xl border border-amber-200/60 bg-amber-50/40 p-4 dark:border-amber-400/20 dark:bg-amber-500/5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{c.siswa}</p>
                  <Badge tone={c.keseriusan === "tinggi" ? "rose" : c.keseriusan === "sedang" ? "amber" : "slate"}>
                    {c.keseriusan}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">{c.kelas} · {c.kategori}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
