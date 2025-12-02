"use client";
import { motion } from "framer-motion";
import SignInCard from "./signInCard";
import { Logo } from "@/components/logo/logo";
import { SocialLoginButtons } from "./socialSignIn";

export function SignInPage() {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-[var(--outfitly-bg-primary)] via-[var(--outfitly-bg-secondary)] to-[var(--outfitly-bg-primary)] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[var(--outfitly-primary)]/10 to-[var(--outfitly-primary-hover)]/10 dark:from-[var(--outfitly-primary)]/20 dark:to-[var(--outfitly-primary-hover)]/20 blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-[var(--outfitly-gradient-mid)]/10 to-[var(--outfitly-gradient-end)]/10 dark:from-[var(--outfitly-gradient-mid)]/20 dark:to-[var(--outfitly-gradient-end)]/20 blur-3xl"
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
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center">
            <Logo size="sm" animated={true} linkTo="/" />
          </div>

          <SignInCard />

          <SocialLoginButtons
            onSocialLogin={() => {
              console.log("Social Login clicked");
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-[var(--outfitly-text-primary)]/60">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => console.log("Sign Up clicked")}
                className="text-[var(--outfitly-primary)] hover:text-[var(--outfitly-primary-hover)] dark:hover:text-[var(--outfitly-primary-active)] transition-colors duration-300"
              >
                Sign Up
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
