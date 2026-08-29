"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Paperclip, Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { riwayatSiswaEdit } from "@/data";
import { cn } from "@/lib/utils";

const toneMap = {
  prestasi: { badge: "green", dot: "bg-emerald-500", label: "Prestasi" },
  konseling: { badge: "indigo", dot: "bg-green-500", label: "Konseling" },
  pelanggaran: { badge: "rose", dot: "bg-rose-500", label: "Pelanggaran" },
};

export default function InputCatatanPage() {
  const [kategori, setKategori] = useState("konseling");
  const [keseriusan, setKeseriusan] = useState("sedang");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const { toast } = useToast();

  const submit = (e) => {
    e.preventDefault();
    toast({ title: "Catatan disimpan", description: "Catatan BK berhasil ditambahkan", type: "success" });
    setTitle("");
    setDetail("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Input Catatan</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Catat konseling, pelanggaran, atau prestasi siswa</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Form Catatan</CardTitle>
            <Badge tone="amber">Baru</Badge>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <Select
                label="Siswa"
                options={[
                  { value: "raka", label: "Raka Ardiansyah — X RPL" },
                  { value: "bima", label: "Bima Saputra — X TKJ" },
                  { value: "cita", label: "Citra Ayu — X RPL" },
                ]}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Select
                  label="Kategori"
                  options={[
                    { value: "konseling", label: "Konseling" },
                    { value: "pelanggaran", label: "Pelanggaran" },
                    { value: "prestasi", label: "Prestasi" },
                    { value: "akademik", label: "Akademik" },
                    { value: "sosial", label: "Sosial" },
                  ]}
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                />
                <Select
                  label="Tingkat Keseriusan"
                  options={[
                    { value: "rendah", label: "Rendah" },
                    { value: "sedang", label: "Sedang" },
                    { value: "tinggi", label: "Tinggi" },
                  ]}
                  value={keseriusan}
                  onChange={(e) => setKeseriusan(e.target.value)}
                />
              </div>
              <Input
                label="Judul / Topik"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">
                  Detail Catatan
                </label>
                <textarea
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-white/70 p-3 text-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-white focus-ring"
                  placeholder="Deskripsi lengkap catatan..."
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <button type="button" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5">
                  <Paperclip className="h-4 w-4" /> Lampiran (UI)
                </button>
              </div>

              <Button type="submit" className="w-full" loading={false}>
                <Send className="h-4 w-4" /> Simpan Catatan
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Student history split view */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Siswa</CardTitle>
            <Badge tone="slate">Konteks</Badge>
          </CardHeader>
          <CardContent>
            <div className="relative ml-2 space-y-4 border-l-2 border-slate-100 pl-5 dark:border-white/10">
              {riwayatSiswaEdit.map((r, i) => {
                const t = toneMap[r.tipe];
                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="relative"
                  >
                    <span className={cn("absolute -left-[25px] top-2 h-3 w-3 rounded-full ring-4 ring-white dark:ring-[#081510]", t.dot)} />
                    <div className="flex items-center gap-2">
                      <Badge tone={t.badge}>{t.label}</Badge>
                      <span className="text-xs text-slate-400">{r.tanggal}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-slate-500">{r.detail}</p>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
