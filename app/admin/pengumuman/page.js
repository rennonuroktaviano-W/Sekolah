"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bold, Italic, Underline, List, Send, Megaphone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";

export default function PengumumanPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState("semua");
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Manajemen Pengumuman</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Broadcast pengumuman ke role tertentu</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Buat Pengumuman</CardTitle>
            <Badge tone="navy">Editor</Badge>
          </CardHeader>
          <CardContent>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul pengumuman"
              className="mb-3 w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-lg font-semibold dark:border-white/10 dark:bg-white/[0.03] dark:text-white focus-ring"
            />
            <Select
              label="Target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              options={[
                { value: "semua", label: "Semua Role" },
                { value: "siswa", label: "Siswa" },
                { value: "ortu", label: "Orang Tua" },
                { value: "guru", label: "Guru" },
              ]}
            />

            {/* Formatting toolbar */}
            <div className="mt-3 flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-white/10">
              {[Bold, Italic, Underline, List].map((Icon, i) => (
                <button key={i} className="rounded-lg p-2 text-slate-500 hover:bg-white hover:shadow-sm dark:hover:bg-white/10 focus-ring">
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="Tulis isi pengumuman di sini..."
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm leading-relaxed dark:border-white/10 dark:bg-white/[0.03] dark:text-white focus-ring"
            />

            <div className="mt-4 flex justify-end">
              <Button onClick={() => toast({ title: "Pengumuman dibuat", description: `Dikirim ke ${target}`, type: "success" })}>
                <Send className="h-4 w-4" /> Publikasikan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview Kartu</CardTitle>
            <Badge tone="green">Live</Badge>
          </CardHeader>
          <CardContent>
            <motion.div
              layout
              className="card-surface overflow-hidden rounded-2xl"
              whileHover={{ y: -4 }}
            >
              <div className="bg-gradient-to-br from-navy to-[#166534] p-6 text-white">
                <div className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-wide opacity-80">Pengumuman</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-bold">
                  {title || "Judul pengumuman akan tampil di sini"}
                </h3>
                <Badge tone="white" className="mt-2 bg-white/20 text-white">Target: {target}</Badge>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {content || "Isi pengumuman akan tampil di sini secara real-time sesuai yang Anda ketik di editor..."}
                </p>
                <p className="mt-4 text-xs text-slate-400">Dipublikasikan · Admin</p>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
