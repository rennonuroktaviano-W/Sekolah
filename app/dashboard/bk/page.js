"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
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
import { bkRingkasan, statistikPelanggaran, kasusTren, kanbanKasus } from "@/data";

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
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={statistikPelanggaran}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {statistikPelanggaran.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Kasus per Bulan</CardTitle>
            <Badge tone="rose">Aktivitas</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={kasusTren}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11 }} stroke="currentColor" className="opacity-40" />
                <YAxis tick={{ fontSize: 11 }} stroke="currentColor" className="opacity-40" />
                <Tooltip />
                <Line type="monotone" dataKey="kasus" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cases needing attention across columns */}
      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <motion.div
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-rose-400/10"
          />
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
