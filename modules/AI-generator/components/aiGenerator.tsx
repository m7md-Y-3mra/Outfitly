"use client";

import { AnimatePresence, motion } from "framer-motion";
import AnimatedBg from "./animatedBg";
import { OutfitPreviewModal } from "./outfitModal";
import type { IItemsForAI } from "../types/generator.types";
import { useAIGenerator } from "../hook/useAIGenerator";
import { PageHeader } from "@/components/page-header";
import AIGeneratorConfigCard from "./configCards";
import { Activity } from "react";

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
        <PageHeader
          title="AI Style Assistant"
          subtitle="Let artificial intelligence design your perfect outfit"
        />

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
      </main>

      <Activity mode={open && viewingOutfit ? "visible" : "hidden"}>
        <AnimatePresence>
          <motion.div
            key="outfit-preview-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-100000"
          >
            <OutfitPreviewModal
              open={open}
              outfit={viewingOutfit!}
              onSave={onSave}
              onClose={() => setViewingOutfit(null)}
            />
          </motion.div>
        </AnimatePresence>
      </Activity>
    </div>
  );
}
