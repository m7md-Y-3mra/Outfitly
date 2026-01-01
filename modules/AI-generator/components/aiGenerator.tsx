"use client";

import AnimatedBg from "./animatedBg";
import { OutfitPreviewModal } from "./outfitModal";
import type { IItemsForAI } from "../types/generator.types";
import { useAIGenerator } from "../hook/useAIGenerator";
import { PageHeader } from "@/components/page-header";
import AIGeneratorConfigCard from "./configCards";
import { AIGeneratorLoading } from "./resultsLoader";
import { useTranslations } from "next-intl";

export interface IGeneratedOutfit {
  name: string;
  description: string;
  style: string;
  confidence: number;
  items: string[];
  image: string;
}

export interface IOutfitForModal extends Omit<IGeneratedOutfit, "items"> {
  items: IItemsForAI[];
}

export type AIGeneratorFormData = {
  occasion: string;
  weather: string;
  style: string;
  requirements: string;
};

export default function AIGenerator() {
  const t = useTranslations("AIGenerator");
  const {
    formData,
    customOccasion,
    canGenerate,
    isGenerating,
    showResults,
    generatedOutfits,
    open,
    viewingOutfit,
    onSave,
    setFormData,
    setCustomOccasion,
    handleGenerate,
    onSelectOutfit,
    setViewingOutfit,
  } = useAIGenerator();

  return (
    <div
      className="relative min-h-screen overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <AnimatedBg />

      <main className="relative z-10 pt-20 pb-16">
        <PageHeader title={t("heading")} subtitle={t("subtitle")} />

        <AIGeneratorConfigCard
          formData={formData}
          customOccasion={customOccasion}
          canGenerate={canGenerate}
          isGenerating={isGenerating}
          showResults={showResults}
          generatedOutfits={generatedOutfits}
          onFormChange={setFormData}
          onCustomOccasionChange={setCustomOccasion}
          onSelectOutfit={onSelectOutfit}
          onGenerate={handleGenerate}
        />
        <AIGeneratorLoading show={isGenerating} />
      </main>

      {viewingOutfit && (
        <OutfitPreviewModal
          open={open}
          outfit={viewingOutfit!}
          onSave={onSave}
          onClose={() => setViewingOutfit(null)}
        />
      )}
    </div>
  );
}
