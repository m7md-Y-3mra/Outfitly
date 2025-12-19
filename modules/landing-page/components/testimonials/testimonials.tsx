"use client";

import { Star, Quote, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useTestimonials } from "./hooks/useTestimonials";
import {
  TESTIMONIALS_CONTENT,
  TESTIMONIALS,
  TESTIMONIALS_GRADIENTS,
} from "./testimonials.constants";

export function Testimonials() {
  const { theme } = useTheme();
  const { refs, hoveredCard, handleCardHover, handleCardLeave, handleCardMouseMove, setCardRef } =
    useTestimonials();
  const isDark = theme === "dark";
  const gradients = isDark ? TESTIMONIALS_GRADIENTS.dark : TESTIMONIALS_GRADIENTS.light;

  // Split testimonials into two rows
  const row1 = TESTIMONIALS.slice(0, 4);
  const row2 = TESTIMONIALS.slice(4, 8);

  const renderCard = (
    testimonial: (typeof TESTIMONIALS)[0],
    index: number,
    rowOffset: number = 0,
  ) => {
    const cardIndex = index + rowOffset;
    const isHovered = hoveredCard === cardIndex;

    return (
      <div
        key={`${testimonial.id}-${rowOffset === 0 ? "a" : "b"}`}
        ref={setCardRef(cardIndex)}
        className="flex-shrink-0 w-[350px] sm:w-[400px] p-6 rounded-3xl cursor-pointer transition-colors duration-300"
        style={{
          background: isHovered ? gradients.cardHover : gradients.card,
          backdropFilter: "blur(20px)",
          border: `1px solid ${isDark ? "rgba(250, 241, 237, 0.1)" : "rgba(103, 20, 37, 0.1)"}`,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        onMouseEnter={() => handleCardHover(cardIndex)}
        onMouseLeave={() => handleCardLeave(cardIndex)}
        onMouseMove={(e) => handleCardMouseMove(e, cardIndex)}
      >
        {/* Quote Icon */}
        <div
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${gradients.accent}, ${isDark ? "#F2E8E3" : "#8B1D35"})`,
            boxShadow: `0 4px 15px ${isDark ? "rgba(250, 241, 237, 0.3)" : "rgba(103, 20, 37, 0.3)"}`,
            transform: "translateZ(20px)",
          }}
        >
          <Quote className="w-5 h-5" style={{ color: isDark ? "#1a1a1a" : "#FAF1ED" }} />
        </div>

        {/* Highlight Badge */}
        {testimonial.highlight && (
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{
              background: isDark ? "rgba(250, 241, 237, 0.1)" : "rgba(103, 20, 37, 0.1)",
              color: gradients.accent,
            }}
          >
            <Sparkles className="w-3 h-3" />
            {testimonial.highlight}
          </div>
        )}

        {/* Content */}
        <p
          className="text-sm sm:text-base leading-relaxed mb-6"
          style={{
            color: isDark ? "rgba(250, 241, 237, 0.9)" : "rgba(76, 20, 32, 0.9)",
            transform: "translateZ(10px)",
          }}
        >
          "{testimonial.content}"
        </p>

        {/* Rating */}
        <div className="flex gap-1 mb-4" style={{ transform: "translateZ(15px)" }}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#FFB800" }} />
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3" style={{ transform: "translateZ(20px)" }}>
          <div
            className={`w-12 h-12 rounded-full overflow-hidden ring-2 ${
              isDark ? "ring-[#FAF1ED]/20" : "ring-[#671425]/20"
            }`}
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-sm" style={{ color: isDark ? "#FAF1ED" : "#671425" }}>
              {testimonial.name}
            </h4>
            <p
              className="text-xs"
              style={{
                color: isDark ? "rgba(250, 241, 237, 0.6)" : "rgba(103, 20, 37, 0.6)",
              }}
            >
              {testimonial.role}
            </p>
          </div>
        </div>

        {/* Decorative gradient on hover */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${isDark ? "rgba(250, 241, 237, 0.1)" : "rgba(103, 20, 37, 0.05)"}, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>
    );
  };

  return (
    <section
      ref={refs.sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: gradients.section }}
    >
      {/* Background Decorations */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(250, 241, 237, 0.03) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(103, 20, 37, 0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(250, 241, 237, 0.02) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(103, 20, 37, 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Heading */}
      <div ref={refs.headingRef} className="max-w-4xl mx-auto px-6 text-center mb-16">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{
            background: isDark ? "rgba(250, 241, 237, 0.1)" : "rgba(103, 20, 37, 0.1)",
            border: `1px solid ${isDark ? "rgba(250, 241, 237, 0.2)" : "rgba(103, 20, 37, 0.2)"}`,
          }}
        >
          <Star className="w-4 h-4" style={{ color: "#FFB800", fill: "#FFB800" }} />
          <span className="text-sm font-medium" style={{ color: isDark ? "#FAF1ED" : "#671425" }}>
            {TESTIMONIALS_CONTENT.badge}
          </span>
        </div>

        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent"
          style={{ backgroundImage: gradients.text }}
        >
          {TESTIMONIALS_CONTENT.heading.title}
        </h2>
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto"
          style={{
            color: isDark ? "rgba(250, 241, 237, 0.8)" : "rgba(103, 20, 37, 0.8)",
          }}
        >
          {TESTIMONIALS_CONTENT.heading.subtitle}
        </p>
      </div>

      {/* Testimonials Tracks */}
      <div className="space-y-8">
        {/* Track 1 - Scrolls Left */}
        <div className="relative">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to right, rgba(26, 26, 26, 1), transparent)"
                : "linear-gradient(to right, rgba(250, 241, 237, 1), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to left, rgba(26, 26, 26, 1), transparent)"
                : "linear-gradient(to left, rgba(250, 241, 237, 1), transparent)",
            }}
          />

          <div ref={refs.track1Ref} className="flex gap-6 px-6" style={{ width: "fit-content" }}>
            {/* Duplicate for infinite scroll */}
            {[...row1, ...row1].map((testimonial, index) => renderCard(testimonial, index, 0))}
          </div>
        </div>

        {/* Track 2 - Scrolls Right */}
        <div className="relative">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to right, rgba(26, 26, 26, 1), transparent)"
                : "linear-gradient(to right, rgba(250, 241, 237, 1), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to left, rgba(26, 26, 26, 1), transparent)"
                : "linear-gradient(to left, rgba(250, 241, 237, 1), transparent)",
            }}
          />

          <div ref={refs.track2Ref} className="flex gap-6 px-6" style={{ width: "fit-content" }}>
            {/* Duplicate for infinite scroll */}
            {[...row2, ...row2].map((testimonial, index) => renderCard(testimonial, index, 100))}
          </div>
        </div>
      </div>

      {/* Stats at bottom */}
      <div className="max-w-4xl mx-auto px-6 mt-16">
        <div
          className="grid grid-cols-3 gap-8 py-8 rounded-2xl"
          style={{
            background: isDark ? "rgba(250, 241, 237, 0.05)" : "rgba(103, 20, 37, 0.05)",
            backdropFilter: "blur(10px)",
          }}
        >
          {[
            { value: "4.9", label: "Average Rating" },
            { value: "50K+", label: "Happy Users" },
            { value: "98%", label: "Would Recommend" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl sm:text-4xl font-bold mb-1 bg-clip-text text-transparent"
                style={{ backgroundImage: gradients.text }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm"
                style={{
                  color: isDark ? "rgba(250, 241, 237, 0.6)" : "rgba(103, 20, 37, 0.6)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
