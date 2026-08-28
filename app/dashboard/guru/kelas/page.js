"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { kelasGuru } from "@/data";

export default function KelasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Kelas & Mapel</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Pilih kelas untuk mengelola nilai dan presensi</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kelasGuru.map((k, i) => (
          <motion.div
            key={k.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link href="/dashboard/guru/input-nilai">
              <Card hover className="group h-full p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 font-display text-lg font-bold text-white">
                    {k.nama.replace("Kelas ", "")}
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-500" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{k.nama}</h3>
                <p className="text-sm text-slate-500">{k.mapel}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                  <Users className="h-4 w-4" /> {k.siswa} siswa
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge tone="teal">Rata-rata {k.rataRata}</Badge>
                  <span className="text-xs text-slate-400">{k.progressInput}% input</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${k.progressInput}%` }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.7 }}
                    className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500"
                  />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}

        {/* Add class card */}
        <Link href="#" className="flex h-full min-h-[220px] items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 transition-colors hover:border-teal-400 hover:bg-teal-50/40 dark:border-white/10 dark:hover:bg-teal-500/5">
          <div className="text-center text-slate-400">
            <span className="text-3xl">+</span>
            <p className="mt-1 text-sm">Tambah Kelas</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
