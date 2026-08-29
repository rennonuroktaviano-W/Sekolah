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
                  {typeof s.value === "number" ? (
                    <>
                      <CountUp to={s.value} suffix={s.suffix || ""} />
                    </>
                  ) : s.value === true ? (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto h-9 w-9"
                        aria-hidden="true"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                  ) : (
                    s.value
                  )}
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
