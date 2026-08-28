"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Badge } from "@/components/ui/badge";
import { kehadiran, users } from "@/data";
import { cn } from "@/lib/utils";

const khadirColors = {
  hadir: { dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", label: "Hadir" },
  izin: { dot: "bg-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10", label: "Izin" },
  sakit: { dot: "bg-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", label: "Sakit" },
  alpa: { dot: "bg-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10", label: "Alpa" },
};

export default function KehadiranPage() {
  const child = users.ortu.children[0];
  const daysOfWeek = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  // Build grid: assume month starts on a Monday offset
  const offset = 0;
  const totalCells = 28;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Kehadiran {child.name}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{kehadiran.bulan}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Summary */}
        <Card className="flex flex-col items-center justify-center p-6">
          <ProgressRing value={kehadiran.persentase} size={150} stroke={12} color="#10b981">
            <span className="font-display text-3xl font-bold">{kehadiran.persentase}%</span>
          </ProgressRing>
          <p className="mt-4 text-sm text-slate-500">Persentase Kehadiran</p>
          <div className="mt-5 grid w-full grid-cols-2 gap-3">
            {Object.entries(kehadiran.ringkasan).map(([k, v]) => {
              const conf = khadirColors[k];
              return (
                <div key={k} className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                  <span className={cn("h-2.5 w-2.5 rounded-full", conf.dot)} />
                  <div>
                    <p className="font-display font-bold">{v}</p>
                    <p className="text-[10px] text-slate-400">{conf.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Kalender Kehadiran</CardTitle>
            <Badge tone="green">Maret 2026</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {daysOfWeek.map((d) => (
                <div key={d} className="pb-2 text-[10px] font-medium uppercase text-slate-400">{d}</div>
              ))}
              {Array.from({ length: offset }).map((_, i) => (
                <div key={`e${i}`} />
              ))}
              {kehadiran.kalender.map((day, i) => {
                const conf = khadirColors[day.status];
                return (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                    whileHover={{ scale: 1.12 }}
                    title={conf.label}
                    className={cn(
                      "relative mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-sm font-medium transition-all",
                      conf.bg
                    )}
                  >
                    {day.date}
                    <span className={cn("absolute bottom-1 h-1 w-1 rounded-full", conf.dot)} />
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4 dark:border-white/10">
              {Object.entries(khadirColors).map(([k, conf]) => (
                <div key={k} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className={cn("h-2.5 w-2.5 rounded-full", conf.dot)} /> {conf.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
