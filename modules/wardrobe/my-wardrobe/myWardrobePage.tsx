import { PageHeader } from "@/components/page-header";
import MyWardrobeStats from "./components/my-wardrobe-stats";
import { Suspense } from "react";
import StatsErrorFallback from "./components/stats-error-fallback";
import StatsLoadingFallback from "./components/stats-loading-fallback";
import { ErrorBoundary } from "react-error-boundary";
import WardrobeFilters from "./components/wardrobe-filters";
import type { SearchParams } from "nuqs";
import WardrobeList from "./components/wardrobe-list";

const Home = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <main className="pt-20 pb-16">
      <PageHeader title="My Wardrobe" subtitle="Manage and organize your fashion collection" />

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
        <WardrobeFilters />

        <ErrorBoundary fallbackRender={StatsErrorFallback}>
          <Suspense fallback={<StatsLoadingFallback />}>
            <WardrobeList searchParams={searchParams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
};

export default Home;
