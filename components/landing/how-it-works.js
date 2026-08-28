"use client";

import { motion } from "framer-motion";
import { PenLine, Cpu, MonitorSmartphone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    icon: PenLine,
    title: "Guru Input",
    desc: "Guru mengisi nilai, presensi, dan catatan BK secara cepat dan efisien.",
    grad: "from-green-500 to-emerald-700",
  },
  {
    icon: Cpu,
    title: "Sistem Proses",
    desc: "Data diolah menjadi visualisasi dan ringkasan yang mudah dipahami.",
    grad: "from-teal-500 to-emerald-500",
  },
  {
    icon: MonitorSmartphone,
    title: "Ortu & Siswa Lihat",
    desc: "Informasi tersaji real-time di dashboard yang hangat dan personal.",
    grad: "from-amber-400 to-orange-500",
  },
];

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Bagaimana <span className="text-gradient">alurnya?</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Tiga langkah sederhana — transparan dari hulu ke hilir.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14 grid gap-8 lg:grid-cols-3">
          {/* connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-green-500 via-teal-400 to-amber-400 lg:block"
          />

          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.2}>
              <div className="relative flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br text-white shadow-xl ${s.grad}`}
                >
                  <s.icon className="h-10 w-10" />
                </motion.div>
                <div className="mt-5">
                  <p className="text-sm font-medium text-slate-400">Langkah {i + 1}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-slate-600 dark:text-slate-300">
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
