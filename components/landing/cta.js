"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { TransitionLink } from "@/components/ui/page-transition";

export function CTA() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="animated-gradient relative overflow-hidden rounded-[2.5rem] p-10 text-center text-white shadow-2xl sm:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

            <h2 className="relative font-display text-3xl font-bold sm:text-4xl">
              Siap membawa sekolahmu ke era digital?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/90">
              Bergabunglah dengan sekolah-sekolah yang sudah memulai
              transformasi akademik mereka bersama SIAS.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <TransitionLink href="/login">
                <Button size="lg" variant="secondary" className="bg-white text-slate-900 hover:bg-white/90">
                  Masuk ke Portal <ArrowRight className="h-5 w-5" />
                </Button>
              </TransitionLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
