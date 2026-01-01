"use client";
import { Logo } from "@/components/logo/logo";
import { SignUpCard } from "./signUpCard";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-[var(--outfitly-bg-primary)] via-[var(--outfitly-bg-secondary)] to-[var(--outfitly-bg-primary)] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[var(--outfitly-primary)]/10 to-[var(--outfitly-primary-hover)]/10 dark:from-[var(--outfitly-primary)]/20 dark:to-[var(--outfitly-primary-hover)]/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-[var(--outfitly-gradient-mid)]/10 to-[var(--outfitly-gradient-end)]/10 dark:from-[var(--outfitly-gradient-mid)]/20 dark:to-[var(--outfitly-gradient-end)]/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-[var(--outfitly-gradient-end)]/10 to-[var(--outfitly-primary-active)]/10 dark:from-[var(--outfitly-gradient-end)]/20 dark:to-[var(--outfitly-primary-active)]/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center">
            <Logo size="xl" animated={true} linkTo="/" />
          </div>

          <SignUpCard />
        </motion.div>
      </div>
    </div>
  );
}
