"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select } from "@/components/ui/select";
import { logAktivitas } from "@/data";

const typeTone = {
  nilai: "indigo",
  auth: "violet",
  bk: "amber",
  sistem: "slate",
  presensi: "teal",
  konten: "navy",
};

export default function LogAktivitasPage() {
  const [logs, setLogs] = useState(logAktivitas);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // simulate infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && hasMore && !loading) {
        setLoading(true);
        setTimeout(() => {
          setLogs((prev) => [...prev, ...logAktivitas]);
          setLoading(false);
          setHasMore(false);
        }, 800);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore, loading]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Log Aktivitas</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Jejak audit seluruh aksi di sistem</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input placeholder="Cari log..." className="h-10 w-full rounded-xl border border-slate-200 bg-white/60 pl-9 pr-3 text-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-white focus-ring" />
        </div>
        <Select
          options={[
            { value: "semua", label: "Semua Role" },
            { value: "guru", label: "Guru" },
            { value: "admin", label: "Admin" },
            { value: "bk", label: "BK" },
          ]}
        />
        <Select
          options={[
            { value: "semua", label: "Semua Aksi" },
            { value: "nilai", label: "Nilai" },
            { value: "auth", label: "Auth" },
            { value: "bk", label: "BK" },
          ]}
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-left dark:border-white/10 dark:bg-white/[0.03]">
                <th className="px-4 py-3 font-medium text-slate-500">Waktu</th>
                <th className="px-4 py-3 font-medium text-slate-500">User</th>
                <th className="px-4 py-3 font-medium text-slate-500">Role</th>
                <th className="px-4 py-3 font-medium text-slate-500">Aksi</th>
                <th className="px-4 py-3 font-medium text-slate-500">Tipe</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, i) => (
                <motion.tr
                  key={`${l.id}-${i}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b border-slate-50 transition-colors hover:bg-slate-50/50 dark:border-white/5 dark:hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                    {l.tanggal} · {l.waktu}
                  </td>
                  <td className="px-4 py-3 font-medium">{l.user}</td>
                  <td className="px-4 py-3"><Badge tone="slate">{l.role}</Badge></td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{l.aksi}</td>
                  <td className="px-4 py-3"><Badge tone={typeTone[l.type]}>{l.type}</Badge></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {loading && (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex items-center gap-3 p-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
            </Card>
          ))}
        </div>
      )}
      {!hasMore && <p className="py-6 text-center text-sm text-slate-400">Semua log telah dimuat.</p>}
    </div>
  );
}
