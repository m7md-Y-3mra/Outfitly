"use client";
import { useRouter } from "nextjs-toploader/app";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export function AddNewGridCard() {
  const router = useRouter();
  const t = useTranslations("Wardrobe.addNew");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={() => router.push("/my-wardrobe/add")}
      className="group relative aspect-3/4 rounded-2xl overflow-hidden cursor-pointer
                 shadow-lg hover:shadow-2xl hover:shadow-[#671425]/30
                 transition-all duration-500 transform hover:-translate-y-1"
      aria-label={t("ariaLabel")}
      role="button"
    >
      <div className="absolute inset-0 bg-linear-to-br from-[#671425] via-[#8B1D35] to-[#A82444]"></div>

      {/* Animated Background Pattern (Refined) */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
        <div
          className="w-16 h-16 mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
                        group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
        >
          <Plus className="w-8 h-8 text-white" aria-hidden="true" />
        </div>
        <h3 className="text-white text-lg font-semibold mb-1">{t("title")}</h3>
        <p className="text-white/80 text-sm">{t("description")}</p>
      </div>
    </motion.div>
  );
}
