"use client";

import { motion } from "framer-motion";
import { CalendarClock, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { jadwalKonseling } from "@/data";

const statusTone = {
  terjadwal: { badge: "indigo", label: "Terjadwal" },
  menunggu: { badge: "amber", label: "Menunggu" },
  selesai: { badge: "green", label: "Selesai" },
};

export default function JadwalKonselingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Jadwal Konseling</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Kelola sesi konseling dengan siswa & ortu</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Booking Sesi</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {jadwalKonseling.map((j, i) => {
          const st = statusTone[j.status];
          return (
            <motion.div
              key={j.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card hover className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-300">
                      <CalendarClock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">{j.siswa}</p>
                      <p className="text-xs text-slate-400">Ortu: {j.ortu}</p>
                      <p className="mt-1 text-sm text-slate-500">{j.tanggal}</p>
                    </div>
                  </div>
                  <Badge tone={st.badge}>{st.label}</Badge>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/10">
                  <span className="text-sm font-medium">{j.waktu}</span>
                  <Button variant="ghost" size="sm">Detail</Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
