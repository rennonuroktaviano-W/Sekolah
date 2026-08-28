"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Reveal } from "@/components/ui/reveal";

const testimonials = [
  {
    name: "Bu Sari",
    role: "Orang Tua Siswa",
    text: "Sekarang saya bisa pantau perkembangan Raka setiap saat. Bukan cuma nilai, tapi juga catatan dari guru BK. Sangat membantu!",
    grad: "from-lime-500 to-lime-500",
  },
  {
    name: "Pak Dede",
    role: "Guru Matematika",
    text: "Input nilai jadi jauh lebih cepat dengan inline editing. Progress kelas langsung terlihat, tidak perlu menunggu manual lagi.",
    grad: "from-teal-500 to-emerald-500",
  },
  {
    name: "Pak Harto",
    role: "Guru BK",
    text: "Dengan kanban kasus dan timeline riwayat siswa, pekerjaan BK jadi lebih terstruktur. Dokumentasi kasus sangat rapi.",
    grad: "from-green-500 to-emerald-700",
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[idx];

  return (
    <section id="testimoni" className="relative py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Kata <span className="text-gradient">mereka</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="mt-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="card-surface relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
              <Quote className="mx-auto h-10 w-10 text-green-500/30" />
              <div className="mt-6 flex min-h-[120px] items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg font-medium text-slate-700 dark:text-slate-200 sm:text-xl"
                  >
                    &ldquo;{t.text}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 flex items-center justify-center gap-3"
                >
                  <Avatar name={t.name} className="" />
                  <div className="text-left">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-slate-400">{t.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* dots */}
              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === idx ? "w-8 bg-green-500" : "w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
