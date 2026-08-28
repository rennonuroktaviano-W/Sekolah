"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { daftarPresensi, kelasGuru } from "@/data";
import { cn } from "@/lib/utils";

const statusOptions = [
  { value: "h", label: "H", full: "Hadir", color: "text-emerald-500 bg-emerald-500/10 ring-emerald-500/30" },
  { value: "i", label: "I", full: "Izin", color: "text-sky-500 bg-sky-500/10 ring-sky-500/30" },
  { value: "s", label: "S", full: "Sakit", color: "text-amber-500 bg-amber-500/10 ring-amber-500/30" },
  { value: "a", label: "A", full: "Alpa", color: "text-rose-500 bg-rose-500/10 ring-rose-500/30" },
];

export default function PresensiPage() {
  const [data, setData] = useState(daftarPresensi);
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  const kelas = kelasGuru[0];

  const setStatus = (id, status) => {
    setData((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    setSaved(false);
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      toast({ title: "Presensi disimpan", description: `Absensi ${kelas.nama} berhasil tersimpan`, type: "success" });
    }, 900);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Presensi Harian</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{kelas.nama} · Hari ini</p>
        </div>
        <Button onClick={save} loading={saved}><Check /> Simpan Presensi</Button>
      </div>

      <div className="flex flex-wrap gap-4">
        {statusOptions.map((o) => {
          const count = data.filter((d) => d.status === o.value).length;
          return (
            <div key={o.value} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 dark:bg-white/5">
              <span className={cn("inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ring-1 ring-inset", o.color)}>
                {o.label}
              </span>
              <span className="text-sm font-medium">{o.full}</span>
              <span className="text-sm font-bold text-slate-400">{count}</span>
            </div>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Siswa</CardTitle>
          <Badge tone="slate">{data.length} siswa</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <div>
                  <p className="font-medium">{d.nama}</p>
                  <p className="text-xs text-slate-400">NIS {d.nis}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {statusOptions.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => setStatus(d.id, o.value)}
                      className={cn(
                        "relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ring-1 transition-all focus-ring",
                        d.status === o.value
                          ? o.color
                          : "text-slate-400 ring-slate-200 hover:bg-slate-100 dark:ring-white/10 dark:hover:bg-white/10"
                      )}
                    >
                      {d.status === o.value && (
                        <motion.span
                          layoutId={`status-${d.id}`}
                          className="absolute inset-0 rounded-xl ring-2 ring-current opacity-40"
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      )}
                      {o.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
