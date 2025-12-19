"use client";

import { Sparkles, Wand2, Users, ArrowRight, Play } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useHero } from "./hooks/useHero";
import {
  HERO_CONTENT,
  HERO_BACKGROUND_IMAGE,
  GRADIENT_COLORS,
  PARALLAX_LAYERS,
} from "./hero.constants";
import Image from "next/image";

export function Hero() {
  const { theme } = useTheme();
  const {
    containerRef,
    headingLine1Ref,
    headingLine2Ref,
    subheadingRef,
    badgeRef,
    ctaRef,
    featuresRef,
    scrollIndicatorRef,
    parallaxLayer1Ref,
    parallaxLayer2Ref,
    parallaxLayer3Ref,
  } = useHero();
  const isDark = theme === "dark";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_BACKGROUND_IMAGE}
          alt="Fashion Background"
          className="w-full h-full object-cover"
          fill
        />
      </div>

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: isDark ? GRADIENT_COLORS.dark.overlay : GRADIENT_COLORS.light.overlay,
        }}
      />

      {/* Parallax Layers - Desktop only */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {/* Layer 1 - Slowest */}
        <div
          ref={parallaxLayer1Ref}
          className="absolute w-80 h-80 rounded-full blur-2xl"
          style={{
            background: "radial-gradient(circle, rgba(250, 241, 237, 0.2) 0%, transparent 70%)",
            top: "15%",
            left: "5%",
            opacity: PARALLAX_LAYERS[0].opacity,
            zIndex: PARALLAX_LAYERS[0].zIndex,
          }}
        />

        {/* Layer 2 - Medium */}
        <div
          ref={parallaxLayer2Ref}
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(139, 29, 53, 0.25) 0%, transparent 70%)",
            top: "50%",
            right: "10%",
            opacity: PARALLAX_LAYERS[1].opacity,
            zIndex: PARALLAX_LAYERS[1].zIndex,
          }}
        />

        {/* Layer 3 - Fastest */}
        <div
          ref={parallaxLayer3Ref}
          className="absolute w-64 h-64 rounded-full blur-xl"
          style={{
            background: "radial-gradient(circle, rgba(250, 241, 237, 0.15) 0%, transparent 70%)",
            bottom: "20%",
            left: "20%",
            opacity: PARALLAX_LAYERS[2].opacity,
            zIndex: PARALLAX_LAYERS[2].zIndex,
          }}
        />
      </div>

      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(250, 241, 237, 0.3) 0%, transparent 70%)",
            top: "10%",
            left: "10%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(139, 29, 53, 0.4) 0%, transparent 70%)",
            bottom: "10%",
            right: "10%",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div
          className="text-center space-y-8"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md"
            style={{
              background:
                "linear-gradient(135deg, rgba(250, 241, 237, 0.15), rgba(250, 241, 237, 0.05))",
              border: "1px solid rgba(250, 241, 237, 0.25)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Sparkles className="w-5 h-5 text-[#FAF1ED]" />
            <span className="text-[#FAF1ED] font-medium">{HERO_CONTENT.badge}</span>
          </div>

          {/* Main Heading with SplitText Animation */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{
              color: "#FAF1ED",
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            <span
              ref={headingLine1Ref}
              className="block"
              style={{
                transform: "translateZ(20px)",
                transformStyle: "preserve-3d",
              }}
            >
              {HERO_CONTENT.heading.line1}
            </span>
            <span
              ref={headingLine2Ref}
              className="block mt-2 bg-clip-text "
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #FAF1ED, #F2E8E3, #FAF1ED, #E8DDD8, #FAF1ED)",
                backgroundSize: "200% auto",
                animation: "gradient-shift 4s ease infinite",
                transform: "translateZ(40px)",
                filter: "drop-shadow(0 4px 20px rgba(250, 241, 237, 0.3))",
                transformStyle: "preserve-3d",
              }}
            >
              {HERO_CONTENT.heading.line2}
            </span>
          </h1>

          {/* Subheading */}
          <p
            ref={subheadingRef}
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            style={{
              color: "rgba(250, 241, 237, 0.9)",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            {HERO_CONTENT.subheading}
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-4">
            <Button
              size="lg"
              className="group px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105 relative overflow-hidden"
              style={{
                backgroundColor: "#FAF1ED",
                color: "#671425",
                boxShadow:
                  "0 10px 40px rgba(250, 241, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                {HERO_CONTENT.cta.primary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shine effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  transform: "translateX(-100%)",
                  animation: "shine 0.6s ease-out forwards",
                }}
              />
            </Button>

            <Button
              size="lg"
              className="group px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-md"
              style={{
                background: "rgba(250, 241, 237, 0.1)",
                border: "2px solid rgba(250, 241, 237, 0.4)",
                color: "#FAF1ED",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              {HERO_CONTENT.cta.secondary}
            </Button>
          </div>

          {/* Feature Pills */}
          <div ref={featuresRef} className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-8">
            {HERO_CONTENT.features.map((feature, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 px-5 sm:px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-default"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(250, 241, 237, 0.12), rgba(250, 241, 237, 0.04))",
                  border: "1px solid rgba(250, 241, 237, 0.15)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(250, 241, 237, 0.25), rgba(250, 241, 237, 0.1))",
                    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {feature.icon === "wand" ? (
                    <Wand2 className="w-5 h-5 text-[#FAF1ED]" />
                  ) : (
                    <Users className="w-5 h-5 text-[#FAF1ED]" />
                  )}
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm text-[#FAF1ED]/70">{feature.label}</div>
                  <div className="text-sm sm:text-base text-[#FAF1ED] font-medium">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div ref={scrollIndicatorRef} className="pt-12 sm:pt-16">
            <div className="inline-block cursor-pointer hover:scale-110 transition-transform">
              <div
                className="w-6 h-10 rounded-full flex items-start justify-center p-2"
                style={{
                  border: "2px solid rgba(250, 241, 237, 0.5)",
                  background: "rgba(250, 241, 237, 0.05)",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full bg-[#FAF1ED]"
                  style={{
                    boxShadow: "0 0 10px rgba(250, 241, 237, 0.5)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: isDark ? GRADIENT_COLORS.dark.bottom : GRADIENT_COLORS.light.bottom,
        }}
      />

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes shine {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }
      `}</style>
    </section>
  );
}
