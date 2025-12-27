"use client";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { FallbackProps } from "react-error-boundary";
import { useTranslations } from "next-intl";

const CategoriesTabErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const t = useTranslations("Wardrobe.errors");

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="
              px-6 py-3 rounded-full
              bg-white dark:bg-[#2A2A30]
              border border-destructive/30
              opacity-60
            "
          >
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{t("failed")}</span>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={resetErrorBoundary} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        {t("tryAgain")}
      </Button>
    </div>
  );
};

export default CategoriesTabErrorFallback;
