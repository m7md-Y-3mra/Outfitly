import { Skeleton } from "@/components/ui/skeleton";

export function ProfileOutfitsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className="aspect-[3/4] rounded-xl"
        />
      ))}
    </div>
  );
}
