"use client";

import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  UserCheck,
  Calendar,
  Activity,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { adminKpi, aktivitasTerbaru } from "@/data";

const iconMap = { users: Users, graduation: GraduationCap, "user-check": UserCheck, calendar: Calendar };
const toneMap = {
  indigo: "text-green-600 dark:text-green-300 bg-green-500/10",
  teal: "text-teal-600 dark:text-teal-300 bg-teal-500/10",
  amber: "text-amber-600 dark:text-amber-300 bg-amber-500/10",
  violet: "text-emerald-700 dark:text-emerald-300 bg-emerald-600/10",
};
const sparkColor = { indigo: "#22c55e", teal: "#14b8a6", amber: "#f59e0b", violet: "#10b981" };

// Sparkline SVG ringan (tanpa recharts) untuk kartu KPI.
function Sparkline({ values, color, width = 80, height = 32 }) {
  const len = Math.max(values.length, 2);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((v, i) => {
      const x = (i / (len - 1)) * width;
      const y = height - 3 - ((v - min) / range) * (height - 6);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0 overflow-visible"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Overview Sistem</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Tahun Ajaran 2025/2026 · Semester Ganjil</p>
      </div>

      {/* KPI cards with sparkline */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {adminKpi.map((k, i) => {
          const Icon = iconMap[k.icon];
          const t = toneMap[k.tone];
          return (
            <motion.div
              key={k.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card hover className="p-5">
                <div className="flex items-center justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${t}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Sparkline values={k.spark} color={sparkColor[k.tone]} />
                </div>
                <p className="mt-3 font-display text-3xl font-bold">{typeof k.value === "number" ? <CountUp to={k.value} /> : k.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{k.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Activity feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-navy dark:text-sky-300" /> Aktivitas Terbaru
          </CardTitle>
          <Badge tone="navy">Live</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {aktivitasTerbaru.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <div className="relative">
                  <Avatar name={a.user} size="sm" />
                  {i === 0 && (
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#081510]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm">
                    <span className="font-semibold">{a.user}</span>{" "}
                    <span className="text-slate-500 dark:text-slate-400">{a.aksi}</span>
                  </p>
                  <p className="text-xs text-slate-400">{a.time}</p>
                </div>
                <Badge tone={a.role === "Admin" ? "navy" : a.role === "BK" ? "amber" : a.role === "Sistem" ? "slate" : "teal"}>
                  {a.role}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
