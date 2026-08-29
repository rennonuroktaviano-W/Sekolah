"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Scale, Check, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { bobotPenilaian, SCHOOL } from "@/data";

const presetColors = ["#22c55e", "#14b8a6", "#10b981", "#f59e0b", "#14532d", "#ef4444"];

export default function PengaturanPage() {
  const [brandColor, setBrandColor] = useState("#22c55e");
  const [sekolah, setSekolah] = useState(SCHOOL.name);
  const [weights, setWeights] = useState(bobotPenilaian);
  const { toast } = useToast();

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const weightKeys = [
    { key: "tugas", label: "Tugas", color: "#22c55e" },
    { key: "uh", label: "UH", color: "#14b8a6" },
    { key: "uts", label: "UTS", color: "#10b981" },
    { key: "uas", label: "UAS", color: "#f59e0b" },
  ];

  const updateWeight = (k, v) => {
    setWeights((prev) => ({ ...prev, [k]: v }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Pengaturan Sistem</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Kustomisasi branding dan bobot penilaian</p>
        </div>
        <Button onClick={() => toast({ title: "Pengaturan disimpan", type: "success" })}>
          <Check className="h-4 w-4" /> Simpan
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Branding */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-navy dark:text-sky-300" /> Branding Sekolah</CardTitle>
            <Badge tone="navy">Live Preview</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">Nama Sekolah</label>
                <input
                  value={sekolah}
                  onChange={(e) => setSekolah(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-white focus-ring"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Warna Tema</label>
                <div className="flex flex-wrap gap-2.5">
                  {presetColors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setBrandColor(c)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl ring-2 ring-offset-2 transition-transform hover:scale-110 dark:ring-offset-[#081510]"
                      style={{ background: c, boxShadow: brandColor === c ? `0 0 0 4px ${c}33` : undefined }}
                    >
                      {brandColor === c && <Check className="h-5 w-5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live preview */}
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium uppercase text-slate-400">Preview</p>
                <motion.div
                  animate={{ backgroundColor: brandColor }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between rounded-2xl p-5 text-white shadow-lg"
                >
                  <div>
                    <p className="font-display text-lg font-bold">{sekolah}</p>
                    <p className="text-xs opacity-80">Portal Akademik · 2025/2026</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bobot penilaian */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Scale className="h-5 w-5 text-navy dark:text-sky-300" /> Bobot Penilaian</CardTitle>
            <Badge tone={totalWeight === 100 ? "green" : "rose"}>{totalWeight}%</Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            {weightKeys.map((w) => (
              <div key={w.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{w.label}</span>
                  <motion.span
                    key={weights[w.key]}
                    animate={{ scale: [1, 1.2, 1] }}
                    className="font-display text-lg font-bold"
                    style={{ color: w.color }}
                  >
                    {weights[w.key]}%
                  </motion.span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={weights[w.key]}
                  onChange={(e) => updateWeight(w.key, Number(e.target.value))}
                  className="w-full accent-current"
                  style={{ accentColor: w.color }}
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0%</span><span>50%</span>
                </div>
              </div>
            ))}
            <div className="mt-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-white/5">
              {totalWeight === 100
                ? "Komposisi bobot seimbang (100%)."
                : totalWeight < 100
                ? `Total ${totalWeight}% — tambahkan ${100 - totalWeight}% lagi.`
                : `Total melebihi 100% (${totalWeight}%).`}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
