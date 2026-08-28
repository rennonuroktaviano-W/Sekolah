"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarRange, Check, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tahunAjaran } from "@/data";
import { cn } from "@/lib/utils";

export default function TahunAjaranPage() {
  const [years, setYears] = useState(tahunAjaran);
  const active = years.find((y) => y.status === "aktif");

  const setActive = (id) => {
    setYears((prev) => prev.map((y) => ({ ...y, status: y.id === id ? "aktif" : "selesai" })));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Tahun Ajaran & Semester</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Kelola periode akademik sekolah</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Tambah Periode</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Timeline Periode</CardTitle>
          <Badge tone="navy">Aktif: {active?.tahun}</Badge>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-4 border-l-2 border-slate-200 pl-6 dark:border-white/10">
            {years.map((y, i) => (
              <motion.div
                key={y.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="relative"
              >
                <span className={cn(
                  "absolute -left-[31px] top-2 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-white dark:ring-[#081510]",
                  y.status === "aktif" ? "bg-emerald-500" : "bg-slate-300 dark:bg-white/20"
                )} />
                <button
                  onClick={() => y.status !== "aktif" && setActive(y.id)}
                  className={cn(
                    "group flex w-full items-center justify-between rounded-2xl border p-4 transition-all",
                    y.status === "aktif"
                      ? "border-emerald-300/50 bg-emerald-50/50 dark:border-emerald-400/30 dark:bg-emerald-500/5"
                      : "border-slate-100 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5"
                  )}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex items-center gap-3">
                      <CalendarRange className="h-5 w-5 text-slate-400" />
                      <span className="font-display font-semibold">{y.tahun}</span>
                      <Badge tone={y.semester === "Ganjil" ? "navy" : "slate"}>{y.semester}</Badge>
                    </div>
                  </div>
                  {y.status === "aktif" ? (
                    <Badge tone="green" className="gap-1"><Check className="h-3 w-3" /> Aktif</Badge>
                  ) : (
                    <span className="text-xs text-slate-400 group-hover:text-slate-600">Klik untuk aktifkan</span>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
