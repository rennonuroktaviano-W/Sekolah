"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

const reports = [
  { id: "r1", title: "Laporan Kasus Bulanan", periode: "Februari 2026", size: "2.4 MB" },
  { id: "r2", title: "Rekap Konseling Siswa", periode: "Semester Ganjil", size: "1.8 MB" },
  { id: "r3", title: "Laporan Psikososial", periode: "Jan-Maret 2026", size: "3.1 MB" },
  { id: "r4", title: "Rekapitulasi Pelanggaran", periode: "2025/2026", size: "900 KB" },
];

export default function LaporanPage() {
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const startExport = (r) => {
    setLoading(true);
    setProgress(0);
    const int = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(int);
          setLoading(false);
          toast({ title: "Laporan siap", description: `${r.title} berhasil diekspor`, type: "success" });
          setPreview(r);
          return 100;
        }
        return p + 20;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Laporan</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Generate laporan BK per periode</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select
          label="Periode"
          options={[
            { value: "feb", label: "Februari 2026" },
            { value: "sem1", label: "Semester Ganjil" },
            { value: "tahunan", label: "Tahunan 2025" },
          ]}
          className="w-48"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {reports.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card hover className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-300">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-xs text-slate-400">{r.periode} · {r.size}</p>
                </div>
              </div>

              {loading && progress < 100 ? (
                <div className="mt-4">
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                    />
                  </div>
                  <p className="mt-1 text-right text-xs text-slate-400">{progress}%</p>
                </div>
              ) : (
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => startExport(r)}>
                    <Download className="h-4 w-4" /> Export PDF
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setPreview(r)}>
                    <Eye className="h-4 w-4" /> Preview
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal
        open={!!preview}
        onClose={() => setPreview(null)}
        title="Preview Laporan"
        footer={<Button onClick={() => setPreview(null)}>Tutup</Button>}
      >
        {preview && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 dark:from-amber-500/10 dark:to-orange-500/10">
              <Badge tone="amber">Preview</Badge>
              <h3 className="mt-3 font-display text-lg font-semibold">{preview.title}</h3>
              <p className="text-sm text-slate-500">{preview.periode}</p>
              <div className="mt-4 space-y-2">
                {["Pendahuluan", "Data Kasus", "Analisis", "Rekomendasi"].map((s) => (
                  <div key={s} className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-sm dark:bg-white/5">
                    <span>{s}</span>
                    <span className="text-xs text-slate-400">3 halaman</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
