"use client";

import { motion } from "framer-motion";
import { RefreshCw, Sparkles, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { AIGeneratorFiltersForm } from "./aiForm";
import type { IFormProps } from "./aiForm";
import { AIOutfitResults } from "./aiOutfitResults";
import type { IGeneratedOutfit } from "./aiGenerator";

interface IProps extends IFormProps {
  canGenerate: boolean;
  isGenerating: boolean;
  showResults: boolean;

  generatedOutfits: IGeneratedOutfit[];
  onSelectOutfit: (name: string) => void;

  onGenerate: () => void;
}

export const AIGeneratorConfigCard = ({
  formData,
  customOccasion,
  canGenerate,
  isGenerating,
  showResults,
  generatedOutfits,
  onFormChange,
  onCustomOccasionChange,
  onSelectOutfit,
  onGenerate,
}: IProps) => {
  const t = useTranslations("AIGenerator");
  const enabledGradient =
    "linear-gradient(135deg, var(--outfitly-gradient-start) 0%, var(--outfitly-gradient-mid) 50%, var(--outfitly-gradient-end) 100%)";

  return (
    <div className="container mx-auto max-w-6xl px-4 mt-12">
      <div
        className="relative overflow-hidden p-8 rounded-2xl border-2 shadow-2xl transition-all duration-300"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
          boxShadow: "0 20px 60px var(--outfitly-shadow)",
        }}
      >
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, var(--outfitly-gradient-start) 0%, var(--outfitly-gradient-mid) 50%, transparent 100%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="relative z-10 flex items-center gap-4 mb-8">
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden"
            style={{ background: enabledGradient }}
            animate={{
              boxShadow: [
                `0 0 20px color-mix(in srgb, var(--outfitly-primary) 30%, transparent)`,
                `0 0 40px color-mix(in srgb, var(--outfitly-primary) 50%, transparent)`,
                `0 0 20px color-mix(in srgb, var(--outfitly-primary) 30%, transparent)`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8" style={{ color: "var(--outfitly-text-light)" }} />
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(45deg, transparent, rgba(255,255,255,0.10), transparent)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.div>

          <div>
            <h2 style={{ color: "var(--outfitly-text-secondary)" }}>{t("config.heading")}</h2>
            <p
              className="mt-1 text-sm opacity-70"
              style={{ color: "var(--outfitly-text-primary)" }}
            >
              {t("config.subtitle")}
            </p>
          </div>
        </div>

        <AIGeneratorFiltersForm
          formData={formData}
          customOccasion={customOccasion}
          onFormChange={onFormChange}
          onCustomOccasionChange={onCustomOccasionChange}
        />

        <motion.div
          className="mt-8"
          whileHover={{ scale: canGenerate ? 1.02 : 1 }}
          whileTap={{ scale: canGenerate ? 0.98 : 1 }}
        >
          <button
            disabled={!canGenerate || isGenerating}
            onClick={onGenerate}
            className="w-full h-16 text-lg relative overflow-hidden flex items-center justify-center gap-3 rounded-2xl shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2"
            style={{
              background: canGenerate
                ? enabledGradient
                : "color-mix(in srgb, var(--outfitly-primary) 14%, transparent)",
              color: canGenerate ? "var(--outfitly-text-light)" : "var(--muted-foreground)",
              outlineColor: "var(--ring)",
              boxShadow: canGenerate ? `0 18px 50px var(--outfitly-shadow)` : "none",
            }}
          >
            {canGenerate && !isGenerating && (
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
            )}

            <div className="relative z-10 flex items-center gap-3">
              {isGenerating ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span>{t("button.generating")}</span>
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6" />
                  <span>{t("button.generate")}</span>
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </div>
          </button>
        </motion.div>
      </div>

      <AIOutfitResults
        generatedOutfits={generatedOutfits}
        isGenerating={isGenerating}
        showResults={showResults}
        onSelectOutfit={onSelectOutfit}
        title={t("results.title")}
      />
    </div>
  );
};

export default AIGeneratorConfigCard;
