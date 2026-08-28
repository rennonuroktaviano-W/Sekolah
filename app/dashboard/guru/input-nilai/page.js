"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Upload,
  Search,
  Filter,
  CloudUpload,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast";
import { daftarNilaiSiswa, kelasGuru } from "@/data";
import { cn } from "@/lib/utils";

const jenisTabs = [
  { value: "tugas", label: "Tugas" },
  { value: "uh", label: "UH" },
  { value: "uts", label: "UTS" },
  { value: "uas", label: "UAS" },
];

const trendColor = { naik: "text-emerald-500", turun: "text-rose-500", stabil: "text-green-500" };

export default function InputNilaiPage() {
  const [rows, setRows] = useState(daftarNilaiSiswa);
  const [jenis, setJenis] = useState("tugas");
  const [loading, setLoading] = useState(true);
  const [dropActive, setDropActive] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(null);
  const { toast } = useToast();
  const kelas = kelasGuru[0];

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleEdit = (id, key, value) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: value } : r))
    );
    setSaving(id);
    setTimeout(() => {
      setSaving(null);
      toast({ title: "Tersimpan", description: "Nilai berhasil disimpan", type: "success" });
    }, 600);
  };

  const progress = Math.round(
    (rows.filter((r) => r[jenis]).length / rows.length) * 100
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Input Nilai</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{kelas.nama} · {kelas.mapel}</p>
        </div>
        <Tabs tabs={jenisTabs} active={jenis} onChange={setJenis} />
      </div>

      {/* progress */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Kelengkapan input nilai {jenis.toUpperCase()}</span>
            <span className="font-bold">{progress}%</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Cari siswa..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-white/60 pl-9 pr-3 text-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-white focus-ring"
          />
        </div>
        <Button variant="secondary"><Filter className="h-4 w-4" /> Filter</Button>
        <Button variant="secondary">
          <Upload className="h-4 w-4" /> Import CSV
        </Button>
      </div>

      {/* Drag-drop import */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDropActive(true); }}
        onDragLeave={() => setDropActive(false)}
        onDrop={(e) => { e.preventDefault(); setDropActive(false); toast({ title: "File diimport", description: "12 nilai berhasil ditambahkan", type: "success" }); }}
        className={cn(
          "flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center transition-all",
          dropActive
            ? "scale-[1.01] border-teal-400 bg-teal-50/60 dark:bg-teal-500/10"
            : "border-slate-200 hover:border-teal-300 dark:border-white/10"
        )}
      >
        <motion.div animate={dropActive ? { y: -6 } : { y: 0 }}>
          <CloudUpload className={cn("h-10 w-10", dropActive ? "text-teal-500" : "text-slate-300")} />
        </motion.div>
        <p className="mt-2 text-sm font-medium">Seret file nilai ke sini</p>
        <p className="text-xs text-slate-400">Atau klik untuk memilih file CSV/Excel</p>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-left dark:border-white/10 dark:bg-white/[0.03]">
                <th className="px-4 py-3 font-medium text-slate-500">Siswa</th>
                <th className="px-4 py-3 font-medium text-slate-500">NIS</th>
                {["tugas", "uh", "uts", "uas"].map((k) => (
                  <th key={k} className="px-4 py-3 text-center font-medium text-slate-500 uppercase">{k}</th>
                ))}
                <th className="px-4 py-3 text-center font-medium text-slate-500">Tren</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-white/5">
                    <td className="px-4 py-3"><Skeleton className="h-5 w-32" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-5 w-16" /></td>
                    {[0, 1, 2, 3].map((j) => (
                      <td key={j} className="px-4 py-3 text-center"><Skeleton className="h-5 w-10 mx-auto" /></td>
                    ))}
                    <td className="px-4 py-3"><Skeleton className="h-5 w-10 mx-auto" /></td>
                  </tr>
                ))
              ) : (
                rows.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-slate-50 transition-colors hover:bg-slate-50/50 dark:border-white/5 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{row.nama}</td>
                    <td className="px-4 py-3 text-slate-500">{row.nis}</td>
                    {["tugas", "uh", "uts", "uas"].map((k) => (
                      <td key={k} className="px-4 py-2 text-center">
                        <InlineCell
                          value={row[k]}
                          editing={editing === `${row.id}-${k}`}
                          saving={saving === row.id && jenis === k}
                          onStart={() => setEditing(`${row.id}-${k}`)}
                          onCommit={(v) => {
                            setEditing(null);
                            handleEdit(row.id, k, Number(v));
                          }}
                        />
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <span className={cn("font-bold", trendColor[row.trend])}>
                        {row.trend === "naik" ? "↑" : row.trend === "turun" ? "↓" : "→"}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function InlineCell({ value, editing, saving, onStart, onCommit }) {
  if (editing) {
    return (
      <input
        autoFocus
        type="number"
        defaultValue={value}
        onBlur={(e) => onCommit(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") onCommit(e.target.value); }}
        className="w-14 rounded-lg border border-teal-400 bg-teal-50/30 px-2 py-1 text-center font-semibold text-teal-600 dark:bg-teal-500/10 dark:text-teal-300 focus:outline-none"
      />
    );
  }
  return (
    <button
      onClick={onStart}
      className="relative inline-flex w-14 items-center justify-center gap-1 rounded-lg py-1 font-semibold transition-colors hover:bg-slate-100 dark:hover:bg-white/10"
    >
      {value}
      <AnimatePresence>
        {saving && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white"
          >
            <Check className="h-2.5 w-2.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
