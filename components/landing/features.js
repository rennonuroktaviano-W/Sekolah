"use client";

import {
  Eye,
  Gauge,
  ShieldCheck,
  LineChart,
  ClipboardCheck,
  MessageSquareHeart,
} from "lucide-react";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/reveal";

const features = [
  {
    icon: Eye,
    title: "Transparansi Total",
    desc: "Ortu & siswa melihat nilai, kehadiran, dan perkembangan secara real-time tanpa harus menunggu rapor.",
    grad: "from-green-500 to-emerald-700",
  },
  {
    icon: Gauge,
    title: "Input Nilai Cepat",
    desc: "Guru menginput nilai dengan inline editing dan auto-save. Minimal klik, maksimal efisiensi.",
    grad: "from-teal-500 to-emerald-500",
  },
  {
    icon: MessageSquareHeart,
    title: "Pendampingan BK",
    desc: "Catatan konseling & pelanggaran terarsip rapi dalam satu timeline yang mudah dimengerti.",
    grad: "from-amber-400 to-orange-500",
  },
  {
    icon: LineChart,
    title: "Data Storytelling",
    desc: "Perkembangan disajikan sebagai grafik tren dan progress ring — bukan sekadar deretan angka.",
    grad: "from-lime-500 to-lime-500",
  },
  {
    icon: ClipboardCheck,
    title: "Presensi Terkelola",
    desc: "Absensi harian dengan toggle cepat dan rekapitulasi otomatis untuk setiap kelas.",
    grad: "from-sky-500 to-green-500",
  },
  {
    icon: ShieldCheck,
    title: "Kontrol Admin Penuh",
    desc: "Kelola user, kelas, mapel, tahun ajaran, hingga branding sekolah dari satu panel terpusat.",
    grad: "from-[#14532d] to-[#166534]",
  },
];

export function Features() {
  return (
    <section id="fitur" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Semua kebutuhan akademik{" "}
              <span className="text-gradient">dalam satu platform</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Didesain untuk semua pihak dalam ekosistem sekolah — dari guru
              hingga orang tua.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="group card-surface h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg2">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${f.grad}`}
                >
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {f.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
