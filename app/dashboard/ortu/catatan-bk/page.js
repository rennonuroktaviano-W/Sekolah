"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { catatanBK, users } from "@/data";
import { cn } from "@/lib/utils";

const toneMap = {
  prestasi: { badge: "green", dot: "bg-emerald-500", icon: "🏅" },
  konseling: { badge: "indigo", dot: "bg-green-500", icon: "💬" },
  pelanggaran: { badge: "rose", dot: "bg-rose-500", icon: "⚠️" },
};

export default function CatatanBKPage() {
  const child = users.ortu.children[0];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Catatan BK {child.name}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Riwayat konseling, prestasi & pembinaan</p>
      </div>

      {catatanBK.length === 0 ? (
        <Card className="p-10 text-center text-slate-400">
          Tidak ada catatan BK. Semua baik-baik saja! 🎉
        </Card>
      ) : (
        <div className="relative ml-3 space-y-6 border-l-2 border-slate-200 pl-8 dark:border-white/10">
          {catatanBK.map((c, i) => {
            const t = toneMap[c.kategori];
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <span className={cn("absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-white dark:ring-[#081510]", t.dot)} />
                <Card className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={t.badge}>{t.kategoriLabel}</Badge>
                    <span className="text-xs text-slate-400">{c.tanggal}</span>
                  </div>
                  <h3 className="mt-2 font-display font-semibold">{t.icon} {c.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{c.deskripsi}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
