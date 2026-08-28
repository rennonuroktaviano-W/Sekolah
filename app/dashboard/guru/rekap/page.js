"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { useState } from "react";
import { trenNilaiKelas, daftarNilaiSiswa, siswaMenurun } from "@/data";

const chartOf = {
  "9A": "kelas9A",
  "9B": "kelas9B",
};

export default function RekapPage() {
  const [kelas, setKelas] = useState("9A");
  const key = chartOf[kelas];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Rekap & Analitik</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Pantau tren nilai kelas</p>
        </div>
        <Tabs
          tabs={[
            { value: "9A", label: "Kelas 9A" },
            { value: "9B", label: "Kelas 9B" },
          ]}
          active={kelas}
          onChange={setKelas}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Tren Nilai Kelas {kelas}</CardTitle>
            <Badge tone="teal">Per Bulan</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={trenNilaiKelas}>
                <defs>
                  <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11 }} stroke="currentColor" className="opacity-40" />
                <YAxis tick={{ fontSize: 11 }} stroke="currentColor" className="opacity-40" domain={[70, 100]} />
                <Tooltip
                  contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e2e8f0", borderRadius: 12, fontSize: 12 }}
                />
                <Legend />
                <Bar dataKey={key} name={`Kelas ${kelas}`} fill="url(#barFill)" radius={[6, 6, 0, 0]} />
                <Line type="monotone" dataKey={key} stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Perbandingan Antar Kelas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={trenNilaiKelas}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11 }} stroke="currentColor" className="opacity-40" />
                <YAxis tick={{ fontSize: 11 }} stroke="currentColor" className="opacity-40" domain={[70, 100]} />
                <Tooltip
                  contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e2e8f0", borderRadius: 12, fontSize: 12 }}
                />
                <Legend />
                <Line type="monotone" dataKey="kelas9A" name="Kelas 9A" stroke="#14b8a6" strokeWidth={2.5} />
                <Line type="monotone" dataKey="kelas9B" name="Kelas 9B" stroke="#f59e0b" strokeWidth={2.5} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top/bottom performance */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Siswa Berprestasi</CardTitle>
            <Badge tone="green">Top 3</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {[...daftarNilaiSiswa]
              .sort((a, b) => b.akhir - a.akhir)
              .slice(0, 3)
              .map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50 dark:hover:bg-white/5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 font-bold text-emerald-600 dark:text-emerald-300">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{s.nama}</p>
                    <p className="text-xs text-slate-400">{s.nis}</p>
                  </div>
                  <span className="font-display font-bold">{s.akhir}</span>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Perlu Bimbingan</CardTitle>
            <Badge tone="rose">Perhatian</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {siswaMenurun.map((s) => (
              <div key={s.id} className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50 dark:hover:bg-white/5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/10 font-bold text-rose-600 dark:text-rose-300">
                  ⚠
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{s.nama}</p>
                  <p className="text-xs text-slate-400">{s.penurunan}</p>
                </div>
                <span className="font-display font-bold text-rose-500">{s.nilaiSekarang}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
