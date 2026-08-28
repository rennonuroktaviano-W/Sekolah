"use client";

import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { Stats } from "./stats";
import { Features } from "./features";
import { HowItWorks } from "./how-it-works";
import { Testimonials } from "./testimonials";
import { CTA } from "./cta";
import { Footer } from "./footer";

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
