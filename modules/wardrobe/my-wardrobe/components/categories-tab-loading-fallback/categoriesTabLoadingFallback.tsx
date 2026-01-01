import { Skeleton } from "@/components/ui/skeleton";
import { SKELETON_WIDTHS } from "./categoriesTabLoadingFallback.constant";

const CategoriesTabLoadingFallback = () => {
  return (
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="
            px-6 py-3 rounded-full
            bg-white dark:bg-[#2A2A30]
            border border-[#F2E8E3] dark:border-[#35353D]
          "
        >
          <Skeleton className={`h-4 rounded-full ${SKELETON_WIDTHS[i % SKELETON_WIDTHS.length]}`} />
        </div>
      ))}
    </div>
  );
};

export default CategoriesTabLoadingFallback;
