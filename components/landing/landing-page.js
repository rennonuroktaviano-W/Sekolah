"use client";

import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { Stats } from "./stats";
import { Features } from "./features";
import { About } from "./about";
import { HowItWorks } from "./how-it-works";
import { Testimonials } from "./testimonials";
import { CTA } from "./cta";
import { Footer } from "./footer";
import { LoadingScreen } from "./loading-screen";

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <About />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}