"use client";

import { Logo } from "@/components/logo/logo";
import { motion } from "framer-motion";
import { CheckCircle, Home, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AlreadyLoggedPage() {
  const router = useRouter();

  return (
    <div
      className="
        min-h-screen transition-colors duration-300
        bg-gradient-to-br
        from-[var(--outfitly-bg-primary)]
        via-[var(--outfitly-bg-secondary)]
        to-[var(--outfitly-bg-primary)]
        relative overflow-hidden
      "
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="
            absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl
            bg-gradient-to-br
            from-[var(--outfitly-gradient-start)]
            to-[var(--outfitly-gradient-mid)]
            opacity-15 dark:opacity-25
          "
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="
            absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl
            bg-gradient-to-tr
            from-[var(--outfitly-gradient-mid)]
            to-[var(--outfitly-gradient-end)]
            opacity-15 dark:opacity-25
          "
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.25, 0.15, 0.25] }}
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
          <div className="text-center mb-8">
            <Logo size="xl" animated linkTo="/" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="
              rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm mb-6 relative overflow-hidden
              bg-[var(--outfitly-bg-white)]
              dark:bg-[var(--outfitly-bg-secondary)]
            "
          >
            <div
              className="
                absolute top-0 left-0 right-0 h-1
                bg-gradient-to-r
                from-[var(--outfitly-gradient-start)]
                via-[var(--outfitly-gradient-mid)]
                to-[var(--outfitly-gradient-end)]
              "
            />

            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <motion.div
                  className="
                    absolute inset-0 rounded-full blur-xl
                    bg-gradient-to-r
                    from-[var(--outfitly-gradient-start)]
                    to-[var(--outfitly-gradient-mid)]
                    opacity-40
                  "
                  animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.25, 0.45] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div
                  className="
                    relative rounded-full p-4
                    bg-gradient-to-br
                    from-[var(--outfitly-gradient-start)]
                    to-[var(--outfitly-gradient-mid)]
                  "
                >
                  <CheckCircle className="w-16 h-16 text-[var(--outfitly-text-light)]" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-[var(--outfitly-text-primary)] dark:text-[var(--outfitly-text-primary)] mb-2">
                Already Logged In
              </h2>
              <p className="text-[var(--outfitly-text-primary)]/60 dark:text-[var(--outfitly-text-muted)]">
                You&apos;re currently signed in to your account
              </p>
            </motion.div>

            {/* Actions */}
            <div className="space-y-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/wardrobe")}
                className="
                  w-full py-4 rounded-xl text-white
                  shadow-lg transition-all duration-300 relative overflow-hidden group
                  flex items-center justify-center gap-2
                  bg-gradient-to-r
                  from-[var(--outfitly-gradient-start)]
                  to-[var(--outfitly-gradient-mid)]
                  hover:from-[var(--outfitly-primary-hover)]
                  hover:to-[var(--outfitly-gradient-mid)]
                "
                style={{
                  boxShadow: "0 18px 40px var(--outfitly-shadow)",
                }}
              >
                <Home className="w-5 h-5" />
                <span className="relative z-10">Go to Wardrobe</span>

                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                  }}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/profile")}
                className="
                  w-full py-4 rounded-xl border-2 transition-all duration-300
                  flex items-center justify-center gap-2
                  bg-[var(--outfitly-bg-primary)]
                  dark:bg-[var(--outfitly-bg-primary)]
                  text-[var(--outfitly-text-primary)]
                  dark:text-[var(--outfitly-text-primary)]
                  border-[color:var(--outfitly-border-light)]
                  dark:border-[color:var(--outfitly-bg-tertiary)]
                  hover:border-[var(--outfitly-primary)]
                  dark:hover:border-[var(--outfitly-primary-hover)]
                "
              >
                <User className="w-5 h-5" />
                <span>View Profile</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Sign out link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-[var(--outfitly-text-primary)]/60 dark:text-[var(--outfitly-text-muted)]">
              Not you?{" "}
              <button
                onClick={() => router.push("/sign-in")}
                className="
                  transition-colors duration-300
                  text-[var(--outfitly-text-secondary)]
                  hover:text-[var(--outfitly-primary-hover)]
                "
              >
                Sign Out
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
