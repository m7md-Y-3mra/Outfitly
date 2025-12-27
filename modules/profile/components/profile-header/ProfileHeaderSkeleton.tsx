import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileHeaderSkeleton() {
  return (
    <Card className="p-8 border-2 shadow-xl mb-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <Skeleton className="w-40 h-40 rounded-full" />

        <div className="flex-1 space-y-4 w-full">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-3/4" />

          <div className="flex gap-4 mt-6">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </Card>
  );
}
