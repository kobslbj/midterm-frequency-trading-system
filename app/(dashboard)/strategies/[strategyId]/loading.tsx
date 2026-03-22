import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StrategyDetailLoading() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-start gap-3 sm:gap-4 pb-4 border-b">
        <Skeleton className="h-8 w-8 rounded shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-7 sm:h-8 w-40 sm:w-56" />
          <Skeleton className="h-4 w-60 sm:w-80" />
        </div>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-3 sm:px-6">
          <Skeleton className="h-4 w-28" />
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
