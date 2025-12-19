"use client";

import { Hero } from "./components/hero";
import { About } from "./components/about";
import { VideoSection } from "./components/video-section";
import { Testimonials } from "./components/testimonials";

export function LandingPage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero - SplitText reveal, parallax background */}
      <Hero />

      {/* Pinned Features - Feature deep-dive with mask reveals */}
      <About />

      {/* Scroll-Synced Video - Cinematic video scrubbing */}
      <VideoSection />

      {/* Testimonials - 3D cards with auto-scroll, pauses on hover */}
      <Testimonials />
    </main>
  );
}
