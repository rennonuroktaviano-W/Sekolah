"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { jadwalPelajaran, users } from "@/data";
import { cn } from "@/lib/utils";

export default function JadwalPage() {
  const child = users.ortu.children[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Jadwal Pelajaran {child.name}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Mingguan · Kelas {child.class}</p>
        </div>
        <Badge tone="violet">Hari ini: {jadwalPelajaran.hariIni}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {jadwalPelajaran.hari.map((day, i) => {
          const isToday = day.day === jadwalPelajaran.hariIni;
          return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className={cn("p-5", isToday && "ring-2 ring-emerald-500/50 dark:ring-emerald-500/30")}>
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold">{day.day}</h3>
                  {isToday && <Badge tone="violet">Hari Ini</Badge>}
                </div>
                <div className="mt-4 space-y-2.5">
                  {day.kelas.map((k, j) => (
                    <div
                      key={j}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-2.5 transition-colors",
                        isToday
                          ? "border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-500/20 dark:bg-emerald-600/5"
                          : "border-slate-100 dark:border-white/5"
                      )}
                    >
                      <div className="w-16 shrink-0 text-center">
                        <p className="text-[10px] font-medium text-slate-400">{k.time}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{k.mapel}</p>
                        <p className="text-[11px] text-slate-400">{k.guru}</p>
                      </div>
                      <Badge tone="slate">{k.ruang}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
