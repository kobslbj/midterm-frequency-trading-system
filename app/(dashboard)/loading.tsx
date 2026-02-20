import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 sm:h-8 w-24 sm:w-28" />
      </div>

      {/* Metrics Strip */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-3 sm:p-4 lg:p-5 bg-card space-y-2">
                <Skeleton className="h-3 w-16 sm:w-20" />
                <Skeleton className="h-6 sm:h-7 w-20 sm:w-28" />
                <Skeleton className="h-3 w-14 sm:w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader className="px-3 sm:px-6 pb-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20 sm:w-24" />
            <Skeleton className="h-3 w-8" />
          </div>
        </CardHeader>
        <CardContent className="px-1 sm:px-2">
          <Skeleton className="h-[220px] sm:h-[300px] w-full" />
        </CardContent>
      </Card>

      {/* Active Strategies */}
      <div className="space-y-3">
        <Skeleton className="h-3 w-28 sm:w-32" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-2 w-2 rounded-full" />
                  <Skeleton className="h-4 w-28 sm:w-32" />
                  <Skeleton className="h-4 w-10 sm:w-12 ml-auto rounded-full" />
                </div>
                <Skeleton className="h-3 w-32 sm:w-40" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
