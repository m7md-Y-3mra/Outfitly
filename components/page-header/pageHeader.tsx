"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

import { PAGE_HEADER_CLASSES } from "./pageHeader.constants";
import { getRadialPattern } from "./pageHeader.utils";
import { usePageHeader } from "./usePageHeader";
import { useTranslations } from "next-intl";

import type { pageHeaderProps } from "./pageHeader.types";

export function PageHeader({ title, subtitle, className = "", backTo }: pageHeaderProps) {
  const router = useRouter();
  const { isDark } = usePageHeader();
  const t = useTranslations("Common");

  return (
    <div className={`${PAGE_HEADER_CLASSES.wrapper} ${className}`}>
      {/* Background Gradient */}
      <div className={PAGE_HEADER_CLASSES.backgroundGradient}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Decorative Radial Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={getRadialPattern(isDark)} />
      </div>

      {/* Content */}
      <div className={PAGE_HEADER_CLASSES.container}>
        {/* Back Button */}
        {backTo && (
          <motion.button
            onClick={() => router.push(backTo)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[var(--outfitly-text-light)]/80 hover:text-[var(--outfitly-text-light)] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t("goBack")}</span>
          </motion.button>
        )}

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative inline-block">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mb-2 text-transparent font-extrabold uppercase"
              style={{
                textShadow: "0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.1)",
                letterSpacing: "0.02em",
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                lineHeight: "1.1",
                background:
                  "linear-gradient(135deg, var(--outfitly-bg-white) 0%, var(--outfitly-bg-secondary) 50%, var(--outfitly-bg-white) 100%)",
                WebkitBackgroundClip: "text",
              }}
            >
              {title}
            </motion.h1>

            {/* Animated Glow */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-[var(--outfitly-bg-secondary)]/20 via-white/30 to-[var(--outfitly-bg-secondary)]/20 blur-2xl -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[var(--outfitly-text-light)]/90 max-w-2xl mx-auto mt-3 mb-8 italic"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                fontWeight: 300,
                letterSpacing: "0.05em",
              }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Gradient Line */}
          <div className="flex justify-center mt-6">
            <div className="relative w-64 h-1 rounded-full overflow-hidden bg-[var(--outfitly-bg-secondary)]/20">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[var(--outfitly-bg-white)] via-white to-[var(--outfitly-bg-white)]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.5,
                }}
              />
            </div>
          </div>

          {/* Side Elements */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--outfitly-bg-white)]/10 rounded-full blur-3xl" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--outfitly-bg-white)]/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-black/10" />
    </div>
  );
}
