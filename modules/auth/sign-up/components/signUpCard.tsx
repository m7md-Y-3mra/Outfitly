import { motion } from "framer-motion";
import SignUpForm from "./signUpForm";

export function SignUpCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="
        bg-[var(--outfitly-bg-white)]
        dark:bg-[var(--outfitly-bg-secondary)]
        rounded-3xl
        p-8 md:p-10
        shadow-[0_18px_40px_var(--outfitly-shadow)]
        border border-[var(--outfitly-border-light)]
        dark:border-[var(--outfitly-border-medium)]
        backdrop-blur-sm
        mb-6
        relative
        overflow-hidden
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

      <div className="mb-8">
        <h2
          className="
            text-[var(--outfitly-text-primary)]
            dark:text-[var(--outfitly-text-primary)]
            mb-2
          "
        >
          Create Your Account
        </h2>

        <p
          className="
            text-[var(--outfitly-text-secondary)]
            dark:text-[var(--outfitly-text-muted)]
          "
        >
          Join Outfitly and start designing your perfect wardrobe
        </p>
      </div>

      <SignUpForm />
    </motion.div>
  );
}
