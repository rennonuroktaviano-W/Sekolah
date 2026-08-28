"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { School, ChevronDown, UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { daftarMapel, strukturKelas } from "@/data";

export default function KelasMapelPage() {
  const [open, setOpen] = useState(1);
  const [mapels] = useState(daftarMapel);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Kelas & Mapel</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Kelola struktur kelas dan assign guru mapel</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Structure */}
        <Card>
          <CardHeader>
            <CardTitle>Struktur Kelas</CardTitle>
            <Badge tone="navy">Per Tingkat</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {strukturKelas.map((t, ti) => (
              <div key={t.tingkat} className="rounded-2xl border border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setOpen(open === ti ? -1 : ti)}
                  className="flex w-full items-center justify-between px-4 py-3"
                >
                  <span className="font-display font-semibold">{t.tingkat}</span>
                  <motion.span animate={{ rotate: open === ti ? 180 : 0 }}>
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </motion.span>
                </button>
                {open === ti && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden">
                    <div className="grid gap-2 p-3 sm:grid-cols-3">
                      {t.kelas.map((k) => (
                        <div key={k.id} className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                          <div className="flex items-center gap-2">
                            <School className="h-4 w-4 text-navy" />
                            <span className="font-bold">{k.nama}</span>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">Wali: {k.wali}</p>
                          <button className="mt-2 inline-flex items-center gap-1 rounded-lg bg-navy/10 px-2 py-1 text-[10px] font-medium text-navy hover:bg-navy/20">
                            <UserPlus className="h-3 w-3" /> Assign Guru
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mapel assign */}
        <Card>
          <CardHeader>
            <CardTitle>Mata Pelajaran</CardTitle>
            <Badge tone="navy">{mapels.length} mapel</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {mapels.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 dark:border-white/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <School className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{m.nama}</p>
                  <p className="text-xs text-slate-400">Guru: {m.guru}</p>
                </div>
                <div className="flex gap-1.5">
                  {m.kelas.map((k) => (
                    <Badge key={k} tone="slate">{k}</Badge>
                  ))}
                </div>
              </motion.div>
            ))}
            <Button variant="secondary" className="w-full">
              <UserPlus className="h-4 w-4" /> Tambah Mapel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
