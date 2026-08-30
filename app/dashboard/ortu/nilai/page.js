"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { TrendingUp, TrendingDown, Minus, ClipboardList } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AccordionItem } from "@/components/ui/accordion";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Tabs } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  nilaiSemester,
  perbandinganSemester,
  users,
} from "@/data";

// recharts dimuat lazy agar tidak membebani first-load halaman.
const BarCompareChart = dynamic(() => import("@/components/charts/bar-compare"), {
  ssr: false,
  preload: true,
  loading: () => <Skeleton className="h-[220px] w-full" />,
});

const statusColors = {
  naik: { color: "#10b981", icon: TrendingUp },
  turun: { color: "#f43f5e", icon: TrendingDown },
  stabil: { color: "#22c55e", icon: Minus },
};

export default function NilaiPage() {
  const [tab, setTab] = useState("ringkasan");
  const nilai = nilaiSemester.current;
  const child = users.ortu.children[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Nilai {child.name}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{nilai.semester}</p>
      </div>

      {/* Top row: ring + perbandingan */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="flex flex-col items-center justify-center p-6">
          <ProgressRing value={nilai.rataRata} size={140} stroke={12} color="#10b981">
            <span className="font-display text-3xl font-bold">{nilai.rataRata}</span>
          </ProgressRing>
          <p className="mt-4 text-sm text-slate-500">Rata-rata Semester Ini</p>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Perbandingan Antar Semester</CardTitle>
            <Badge tone="violet">Tren</Badge>
          </CardHeader>
          <CardContent>
            <BarCompareChart data={perbandinganSemester} />
          </CardContent>
        </Card>
      </div>

      {/* Detail per mapel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Rincian Nilai per Mapel</h2>
          <Tabs
            tabs={[
              { value: "ringkasan", label: "Komponen" },
              { value: "semua", label: "Semua Komponen" },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        {nilai.mapel.map((m, i) => {
          const st = statusColors[m.status];
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <AccordionItem
                title={m.name}
                icon={ClipboardList}
                defaultOpen={i === 0}
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-emerald-50/60 p-4 dark:bg-emerald-600/10">
                    <p className="text-xs text-slate-400">Nilai Akhir</p>
                    <p className="font-display text-2xl font-bold">{m.nilaiAkhir}</p>
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <st.icon className="h-4 w-4" style={{ color: st.color }} />
                      <span style={{ color: st.color }}>{m.statusLabel}</span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2 dark:bg-white/5">
                    <p className="mb-2 text-xs text-slate-400">Komponen</p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {Object.entries(m.komponen).map(([k, v]) => (
                        <div key={k} className="text-center">
                          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{v}</p>
                          <p className="text-[10px] uppercase text-slate-400">{k}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {tab === "semua" && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 dark:border-white/10">
                    {m.detail.map((d, j) => (
                      <div key={j} className="flex items-center justify-between border-b border-slate-50 px-4 py-2.5 last:border-0 dark:border-white/5">
                        <span className="text-sm">{d.nama}</span>
                        <span className="text-xs text-slate-400">{d.tanggal}</span>
                        <span className="font-display font-semibold">{d.nilai}</span>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionItem>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
