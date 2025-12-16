"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { IGeneratedOutfit } from "./aiGenerator";




type IProps = {
  showResults: boolean;
  isGenerating: boolean;
  generatedOutfits: IGeneratedOutfit[];
  onSelectOutfit: (name: string) => void;
  title?: string;
};

export function AIOutfitResults({
  showResults,
  isGenerating,
  generatedOutfits,
  onSelectOutfit,
  title = "AI Matched Outfits",
}: IProps) {
  return (
    <AnimatePresence>
      {showResults && !isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-16"
        >
          <h2 className="text-center mb-12 font-black text-4xl bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {title}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {generatedOutfits.map((outfit, i) => {
              

              return (
                <motion.div
                  key={outfit.name + "xyz"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    onClick={() => onSelectOutfit(outfit.name)}
                    className="cursor-pointer border-2 border-slate-800 overflow-hidden group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 bg-slate-900 rounded-xl"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      {outfit.image ? (
                        <Image
                          src={outfit.image}
                          alt={outfit.name}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          priority={i < 3}
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-800 flex items-center justify-center text-slate-400 text-sm">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg">
                        {outfit.name}
                      </h3>

                      {outfit.description ? (
                        <p className="text-sm text-slate-400 opacity-70 mt-1">
                          {outfit.description}
                        </p>
                      ) : null}

                      <span className="inline-block mt-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {outfit.confidence}% Match
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
