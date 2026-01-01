import { PageHeader } from "@/components/page-header";
import MyWardrobeStats from "./components/my-wardrobe-stats";
import { Suspense } from "react";
import StatsErrorFallback from "./components/stats-error-fallback";
import StatsLoadingFallback from "./components/stats-loading-fallback";
import { ErrorBoundary } from "react-error-boundary";
import WardrobeFilters from "./components/wardrobe-filters";
import WardrobeList from "./components/wardrobe-list";
import { ViewModeProvider } from "./provider/viewMode.provider";
import WardrobeListLoadingFallback from "./components/wardrobe-list/wardrobeListLoadingFallback";
import WardrobeListErrorFallback from "./components/wardrobe-list/wardrobeListErrorFallback";
import { GetUserWardrobeItemDTO } from "../types/dto.types";
import { getTranslations } from "next-intl/server";

const Home = async ({ searchParams }: { searchParams: GetUserWardrobeItemDTO }) => {
  const t = await getTranslations("Wardrobe");
  return (
    <main className="pt-20 pb-16">
      <PageHeader title={t("heading")} subtitle={t("subtitle")} />

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <ErrorBoundary fallbackRender={StatsErrorFallback}>
          <Suspense fallback={<StatsLoadingFallback />}>
            <MyWardrobeStats />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Filters and Content */}
      <div className="container mx-auto px-4 mt-12">
        <ViewModeProvider>
          <WardrobeFilters />

          <ErrorBoundary fallbackRender={WardrobeListErrorFallback}>
            <Suspense fallback={<WardrobeListLoadingFallback />}>
              <WardrobeList searchParams={searchParams} />
            </Suspense>
          </ErrorBoundary>
        </ViewModeProvider>
      </div>
    </main>
  );
};

export default Home;
