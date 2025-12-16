'use client'
import { Activity, } from "react";
import { IItemsForAI } from "../types/generator.types";
import { OutfitPreviewModal } from "./outfitModal";
import { useAIGenerator } from "../hook/useAIGenerator";
import ConfigCard from "./configCards";
import ConfigHeader from "./configHeader";
import AnimatedBg from "./animatedBg";

export interface IGeneratedOutfit {
  name: string;
  description: string;
  style: string
  confidence: number;
  items: string[];
  image: string;
}

export interface IOutfitForModal extends Omit<IGeneratedOutfit, "items"> {
    items: IItemsForAI[]
}
export type AIGeneratorFormData = {
  occasion: string;
  weather: string;
  style: string;
  requirements: string;
};
// Generate dots once


// const matchWardrobeItems = (items: any, occasion: string, weather: string, style: string): IGeneratedOutfit[] => {
//   return [
//     {
//       id: "1",
//       name: "Casual Chic",
//       description: "Perfect for a relaxed day out",
//       confidence: 95,
//       items: [
//         { id: "1", name: "Blue Denim Jacket", images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"] },
//         { id: "2", name: "White T-Shirt", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"] },
//         { id: "3", name: "Black Jeans", images: ["https://images.unsplash.com/photo-1542272454315-7f6fabf578f2?w=400"] },
//       ],
//       image: "test"
//     },
//     {
//       id: "2",
//       name: "Smart Casual",
//       description: "Balanced and sophisticated look",
//       confidence: 88,
//       items: [
//         { id: "4", name: "Navy Blazer", images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400"] },
//         { id: "5", name: "Grey Chinos", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400"] },
//       ],
//       image: "test"
//     },
//     {
//       id: "3",
//       name: "Weekend Vibes",
//       description: "Comfortable and stylish",
//       confidence: 92,
//       items: [
//         { id: "6", name: "Hoodie", images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"] },
//         { id: "7", name: "Sneakers", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"] },
//       ],
//       image: "test"
//     },
//   ];
// };

export default function AIGeneratorPage() {
    const {
    formData,
    customOccasion,
    canGenerate,
    isGenerating,
    showResults,
    generatedOutfits,
    open,
    viewingOutfit,
    setFormData,
    setCustomOccasion,
    handleGenerate,
    onSelectOutfit,
    setViewingOutfit
  } = useAIGenerator();


  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      
    <AnimatedBg />

      <header className="relative z-10 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">Outfitly</h1>
        </div>
      </header>

      <main className="relative z-10 pt-20 pb-16">
        <ConfigHeader />
        <ConfigCard
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

      <footer className="relative z-10 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-slate-400">
            © 2024 Outfitly. Powered by AI.
          </p>
        </div>
      </footer> 
      <Activity mode={open ? "visible" : "hidden"}>
              <OutfitPreviewModal
                open={open}
                outfit={viewingOutfit!}
                onClose={() =>  setViewingOutfit(null)}
              />
      </Activity>
      {/* ================= MODAL ================= */}
      {/* <AnimatePresence>
        {viewingOutfit && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingOutfit(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-3xl w-full rounded-2xl overflow-hidden bg-slate-900 shadow-2xl"
            >
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h2 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {viewingOutfit.name}
                </h2>
                <button
                  onClick={() => setViewingOutfit(null)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                {viewingOutfit.items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-800 bg-slate-900 overflow-hidden hover:shadow-md transition-shadow rounded-lg"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-2 text-sm text-white font-medium">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}