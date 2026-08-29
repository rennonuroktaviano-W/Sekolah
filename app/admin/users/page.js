"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Plus,
  UserPlus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Check,
  Power,
  KeyRound,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { daftarUser } from "@/data";
import { cn } from "@/lib/utils";

const roleTone = {
  Siswa: "violet",
  Ortu: "fuchsia",
  Guru: "teal",
  BK: "amber",
  Admin: "navy",
};

const roleOptions = [
  { value: "Siswa", label: "Siswa" },
  { value: "Ortu", label: "Orang Tua" },
  { value: "Guru", label: "Guru" },
  { value: "BK", label: "Guru BK" },
  { value: "Admin", label: "Admin" },
];

const wizardSteps = ["Data Dasar", "Detail Role"];

export default function UsersPage() {
  const [users, setUsers] = useState(daftarUser);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [confirm, setConfirm] = useState(null);
  const { toast } = useToast();

  const filtered = users.filter((u) => {
    const matchQ = u.nama.toLowerCase().includes(query.toLowerCase());
    const matchR = roleFilter === "Semua" || u.role === roleFilter;
    return matchQ && matchR;
  });

  const toggleStatus = (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === "aktif" ? "nonaktif" : "aktif" } : u)));
    toast({ title: "Status diubah", type: "success" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Manajemen User</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{users.length} total pengguna</p>
        </div>
        <Button onClick={() => { setStep(0); setWizardOpen(true); }}>
          <UserPlus className="h-4 w-4" /> Tambah User
        </Button>
      </div>

      {/* filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama, NIS/NIP..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-white/60 pl-9 pr-3 text-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-white focus-ring"
          />
        </div>
        <Tabs
          tabs={[
            { value: "Semua", label: "Semua" },
            { value: "Siswa", label: "Siswa" },
            { value: "Guru", label: "Guru" },
            { value: "Ortu", label: "Ortu" },
            { value: "BK", label: "BK" },
          ]}
          active={roleFilter}
          onChange={setRoleFilter}
        />
      </div>

      {/* table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-left dark:border-white/10 dark:bg-white/[0.03]">
                <th className="px-4 py-3 font-medium text-slate-500">User</th>
                <th className="px-4 py-3 font-medium text-slate-500">Role</th>
                <th className="px-4 py-3 font-medium text-slate-500">NIS / NIP</th>
                <th className="px-4 py-3 font-medium text-slate-500">Kelas / Mapel</th>
                <th className="px-4 py-3 font-medium text-slate-500">Status</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-slate-50 transition-colors hover:bg-slate-50/50 dark:border-white/5 dark:hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.nama} size="sm" />
                      <span className="font-medium">{u.nama}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge tone={roleTone[u.role]}>{u.role}</Badge></td>
                  <td className="px-4 py-3 text-slate-500">{u.nip_nis || "-"}</td>
                  <td className="px-4 py-3 text-slate-500">{u.kelas || u.mapel || u.anak || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", u.status === "aktif" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300" : "bg-slate-500/10 text-slate-500")}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", u.status === "aktif" ? "bg-emerald-500" : "bg-slate-400")} />
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => toggleStatus(u.id)} title={u.status === "aktif" ? "Nonaktifkan" : "Aktifkan"} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 focus-ring">
                        <Power className="h-4 w-4" />
                      </button>
                      <button title="Reset password" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 focus-ring">
                        <KeyRound className="h-4 w-4" />
                      </button>
                      <button onClick={() => setConfirm(u.nama)} title="Hapus" className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10 focus-ring">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-400">Tidak ada user ditemukan</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Wizard Modal */}
      <Modal
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        title={`Tambah User — ${wizardSteps[step]}`}
        footer={
          <>
            {step > 0 && <Button variant="ghost" onClick={() => setStep(0)}><ChevronLeft className="h-4 w-4" /> Kembali</Button>}
            {step < wizardSteps.length - 1 ? (
              <Button onClick={() => setStep(1)}>Lanjut <ChevronRight className="h-4 w-4" /></Button>
            ) : (
              <Button onClick={() => { setWizardOpen(false); setStep(0); toast({ title: "User ditambahkan", type: "success" }); }}>
                <Check className="h-4 w-4" /> Simpan
              </Button>
            )}
          </>
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex gap-2">
              {wizardSteps.map((s, i) => (
                <div key={s} className={cn("flex-1 rounded-lg p-1 text-center text-xs", i === step ? "bg-navy text-white" : i < step ? "bg-navy/10 text-navy" : "bg-slate-100 text-slate-400 dark:bg-white/5")}>
                  {i < step && "✓ "}{s}
                </div>
              ))}
            </div>
            {step === 0 ? (
              <>
                <Input label="Nama Lengkap" />
                <Input label="Email" type="email" />
                <Select label="Role" options={roleOptions} />
              </>
            ) : (
              <div className="space-y-3">
                <Input label="NIS / NIP" />
                <Input label="Password" type="password" />
                {roleFilter === "Siswa" && <Select label="Kelas" options={[{ value: "X RPL", label: "X RPL" }, { value: "X TKJ", label: "X TKJ" }, { value: "X DKV", label: "X DKV" }, { value: "XI RPL", label: "XI RPL" }, { value: "XI TKJ", label: "XI TKJ" }, { value: "XI DKV", label: "XI DKV" }]} />}
                <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  User akan diundang melalui email setelah dibuat.
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Modal>

      {/* Confirm delete modal */}
      <Modal
        open={!!confirm}
        onClose={() => setConfirm(null)}
        title="Konfirmasi Hapus"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirm(null)}>Batal</Button>
            <Button variant="danger" onClick={() => { setConfirm(null); toast({ title: "User dihapus", type: "success" }); }}>
              Hapus
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Apakah Anda yakin ingin menghapus user <b>{confirm}</b>? Tindakan ini tidak dapat dibatalkan.
        </p>
      </Modal>
    </div>
  );
}
