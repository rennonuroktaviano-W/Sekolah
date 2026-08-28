"use client";

import { statsLanding } from "@/data";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";

export function Stats() {
  return (
    <section className="relative py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="card-surface grid grid-cols-2 gap-6 rounded-3xl p-8 lg:grid-cols-4">
            {statsLanding.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold sm:text-4xl">
                  <CountUp to={s.value} suffix={s.suffix || ""} />
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
