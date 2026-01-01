"use client";
import { motion } from "framer-motion";
import SignInForm from "./signInForm";
import { useTranslations } from "next-intl";

const SignInCard = () => {
  const t = useTranslations("Auth.signIn");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="
        rounded-3xl p-8 md:p-10 mb-6 relative overflow-hidden
        backdrop-blur-sm shadow-2xl
        bg-[var(--outfitly-surface)]
        text-[var(--outfitly-foreground)]
        border border-[var(--outfitly-border)]
      "
    >
      {/* Top Accent Bar */}
      <div
        className="
          absolute top-0 left-0 right-0 h-1
          bg-gradient-to-r
          from-[var(--outfitly-primary)]
          via-[var(--outfitly-primary-hover)]
          to-[var(--outfitly-primary-active)]
        "
      />

      {/* Welcome Text */}
      <div className="mb-8">
        <h2 className="mb-2 text-[var(--outfitly-heading)]">{t("heading")}</h2>
        <p className="text-sm text-[var(--outfitly-muted-foreground)]">{t("subtitle")}</p>
      </div>

      {/* Login Form */}
      <SignInForm />
    </motion.div>
  );
};

export default SignInCard;
