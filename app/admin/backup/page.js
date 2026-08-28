"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DatabaseBackup, ShieldCheck, CheckCircle2, HardDriveDownload, FileArchive } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

export default function BackupPage() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!running) return;
    const int = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(int);
          setRunning(false);
          setTimeout(() => setSuccess(true), 400);
          return 100;
        }
        return p + 10;
      });
    }, 200);
    return () => clearInterval(int);
  }, [running]);

  const backups = [
    { id: "b1", name: "backup-database-20260320.sql", size: "48 MB", date: "20 Mar 2026, 02:00" },
    { id: "b2", name: "backup-database-20260319.sql", size: "47 MB", date: "19 Mar 2026, 02:00" },
    { id: "b3", name: "export-data-nilai-2026.xlsx", size: "3.2 MB", date: "18 Mar 2026" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Backup & Export Data</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Lindungi data sekolah dengan backup terjadwal</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Backup action */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DatabaseBackup className="h-5 w-5 text-navy dark:text-sky-300" /> Backup Database
            </CardTitle>
            <Badge tone="navy">Otomatis</Badge>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl bg-gradient-to-br from-navy to-[#166534] p-6 text-white">
              <p className="text-sm opacity-90">Backup terakhir berhasil dilakukan</p>
              <p className="mt-1 font-display text-lg font-bold">20 Maret 2026, 02:00</p>

              {running ? (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Sedang membuat backup...</span>
                    <span className="font-bold">{progress}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/20">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      className="h-full rounded-full bg-white"
                    />
                  </div>
                </div>
              ) : (
                <Button
                  className="mt-4 bg-white text-navy hover:bg-white/90"
                  onClick={() => { setProgress(0); setRunning(true); }}
                >
                  <HardDriveDownload className="h-4 w-4" /> Jalankan Backup Sekarang
                </Button>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Backup otomatis setiap hari pukul 02:00
            </div>
          </CardContent>
        </Card>

        {/* Backup history */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileArchive className="h-5 w-5 text-navy dark:text-sky-300" /> Riwayat Backup
            </CardTitle>
            <Badge tone="green">Aman</Badge>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {backups.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <FileArchive className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{b.name}</p>
                  <p className="text-xs text-slate-400">{b.date} · {b.size}</p>
                </div>
                <Badge tone="slate">Selesai</Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Success modal */}
      <Modal
        open={success}
        onClose={() => setSuccess(false)}
        size="sm"
      >
        <div className="flex flex-col items-center py-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10"
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </motion.div>
          </motion.div>
          <h3 className="mt-4 font-display text-xl font-bold">Backup Berhasil!</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Database sekolah berhasil dicadangkan dan diamankan.
          </p>
          <Button className="mt-5" onClick={() => setSuccess(false)}>Selesai</Button>
        </div>
      </Modal>
    </div>
  );
}
