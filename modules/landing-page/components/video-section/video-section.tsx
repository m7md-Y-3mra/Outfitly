"use client";

import { useTheme } from "next-themes";
import { useVideoSection } from "./hooks/useVideoSection";
import {
  VIDEO_CONTENT,
  VIDEO_URL,
  VIDEO_GRADIENTS,
} from "./video-section.constants";

export function VideoSection() {
  const { theme } = useTheme();
  const { refs, currentProgress, activeTextIndex } = useVideoSection();
  const isDark = theme === "dark";
  const gradients = isDark ? VIDEO_GRADIENTS.dark : VIDEO_GRADIENTS.light;

  return (
    <section
      ref={refs.sectionRef}
      className="relative"
      style={{ background: gradients.section }}
    >
      {/* Heading */}
      <div ref={refs.headingRef} className="py-16 px-6 text-center">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent"
          style={{ backgroundImage: gradients.text }}
        >
          {VIDEO_CONTENT.heading.title}
        </h2>
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto"
          style={{
            color: isDark ? "rgba(250, 241, 237, 0.8)" : "rgba(103, 20, 37, 0.8)",
          }}
        >
          {VIDEO_CONTENT.heading.subtitle}
        </p>
      </div>

      {/* Video Container */}
      <div ref={refs.containerRef} className="relative min-h-screen">
        {/* Video Element */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={refs.videoRef}
            className="w-full h-full object-cover"
            src={VIDEO_URL}
            muted
            playsInline
            preload="auto"
            loop
          />

          {/* Video Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: gradients.overlay }}
          />
        </div>

        {/* Progress Bar - Desktop */}
        <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 w-1/2 max-w-md z-20">
          <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              ref={refs.progressRef}
              className="absolute left-0 top-0 h-full bg-[#FAF1ED] rounded-full origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs text-white/60">
            {VIDEO_CONTENT.overlayTexts.map((item, index) => (
              <span
                key={item.text}
                className={`transition-all duration-300 ${
                  activeTextIndex === index
                    ? "text-[#FAF1ED] font-medium"
                    : ""
                }`}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* Overlay Text - Desktop */}
        <div
          ref={refs.overlayTextRef}
          className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none z-10"
        >
          {VIDEO_CONTENT.overlayTexts.map((item, index) => (
            <div
              key={item.text}
              className="absolute text-7xl sm:text-8xl lg:text-9xl font-bold text-white/90 tracking-tight"
              style={{
                opacity: 0,
                transform: "scale(0.8)",
                textShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
              }}
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* Mobile/Tablet: Static overlay */}
        <div className="lg:hidden absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-6">
            <div
              className="text-5xl sm:text-6xl font-bold text-white mb-4"
              style={{ textShadow: "0 4px 30px rgba(0, 0, 0, 0.5)" }}
            >
              {VIDEO_CONTENT.overlayTexts[activeTextIndex]?.text || "Style"}
            </div>
            <p className="text-white/80 text-lg">
              Scroll to explore the journey
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-white/30 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-white/30 pointer-events-none hidden lg:block" />

        {/* Scroll Indicator - Mobile */}
        <div className="lg:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <div
              className="w-6 h-10 rounded-full flex items-start justify-center p-2"
              style={{
                border: "2px solid rgba(250, 241, 237, 0.5)",
                background: "rgba(250, 241, 237, 0.1)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#FAF1ED]"
                style={{ boxShadow: "0 0 10px rgba(250, 241, 237, 0.5)" }}
              />
            </div>
          </div>
        </div>

        {/* Progress Percentage - Desktop */}
        <div className="hidden lg:block absolute top-8 right-8 z-20">
          <div
            className="text-6xl font-bold text-white/20"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {Math.round(currentProgress * 100)}%
          </div>
        </div>
      </div>
    </section>
  );
}
