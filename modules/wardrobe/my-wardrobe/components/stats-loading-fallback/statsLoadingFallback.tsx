import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StatsLoadingFallback = () => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Skeleton className="w-10 h-10 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-6 w-24 rounded" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsLoadingFallback;
