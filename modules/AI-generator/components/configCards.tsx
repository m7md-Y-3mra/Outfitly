"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, Zap } from "lucide-react";

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
};

const ConfigCard = ({
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
  return (
    <div className="container mx-auto max-w-6xl px-4 mt-12">
      <div className="relative overflow-hidden border-2 border-slate-800 shadow-2xl p-8 bg-slate-900 rounded-xl">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 blur-3xl opacity-20 bg-gradient-to-br from-purple-600 via-blue-600 to-transparent"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <h2 className="text-white text-2xl font-bold relative z-10">
          Configure Your Perfect Look
        </h2>

        <p className="mt-1 text-slate-400 opacity-70 relative z-10">
          Select your preferences and let AI do the magic
        </p>

        <AIGeneratorFiltersForm
          formData={formData}
          customOccasion={customOccasion}
          onFormChange={onFormChange}
          onCustomOccasionChange={onCustomOccasionChange}
        />

        <button
          disabled={!canGenerate || isGenerating}
          onClick={onGenerate}
          className={`mt-8 w-full h-14 text-lg relative overflow-hidden font-semibold transition-all rounded-lg ${
            canGenerate
              ? "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/30 text-white"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <RefreshCw className="animate-spin mr-2 w-5 h-5" />
              Generating Outfit...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Zap className="mr-2 w-5 h-5" />
              Generate with AI
            </span>
          )}
        </button>
      </div>

      <AIOutfitResults
        generatedOutfits={generatedOutfits}
        isGenerating={isGenerating}
        showResults={showResults}
        onSelectOutfit={onSelectOutfit}
      />
    </div>
  );
};

export default ConfigCard;
