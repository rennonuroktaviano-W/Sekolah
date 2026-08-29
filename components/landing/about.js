"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Award, BadgeCheck, Globe } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SCHOOL } from "@/data/school";

const highlights = [
  { icon: GraduationCap, label: "Program Keahlian", value: "RPL · TKJ · DKV" },
  { icon: Award, label: "Akreditasi", value: SCHOOL.akreditasi },
  { icon: BadgeCheck, label: "Lisensi LSP", value: SCHOOL.lsp },
  { icon: MapPin, label: "Lokasi", value: "Cilandak Barat, Jakarta Selatan" },
];

export function About() {
  return (
    <section id="tentang" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <motion.div whileHover={{ y: -4 }} className="card-surface relative overflow-hidden rounded-3xl p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-500/10 blur-2xl" />
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Tentang Sekolah
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
                {SCHOOL.name}
              </h2>
              <p className="mt-2 font-display text-sm font-medium text-slate-500 dark:text-slate-400">
                {SCHOOL.jenis} · NPSN {SCHOOL.npsn}
              </p>
              <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">
                {SCHOOL.deskripsi}
              </p>
              <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
                Sebagai sekolah berbasis digital, seluruh program keahlian telah
                terlisensi LSP dan didukung{" "}
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Learning Management System
                </span>{" "}
                agar proses belajar, penilaian, dan pelaporan akademik berjalan
                transparan serta modern.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-green-500/[0.07] p-4 text-sm text-slate-600 dark:text-slate-300">
                <MapPin className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                {SCHOOL.addressShort}
              </div>
            </motion.div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.label} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card-surface flex items-start gap-4 rounded-3xl p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/15 to-teal-400/15 text-emerald-600 dark:text-emerald-300">
                    <h.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">{h.label}</p>
                    <p className="mt-0.5 font-display text-sm font-bold">{h.value}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
            <Reveal delay={0.32} className="sm:col-span-2">
              <a
                href={SCHOOL.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Globe className="h-4 w-4" />
                Kunjungi smkbaktiidhata.sch.id
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}