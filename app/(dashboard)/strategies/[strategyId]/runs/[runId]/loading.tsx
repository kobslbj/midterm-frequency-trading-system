import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RunDetailsLoading() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4 pb-4 border-b">
        <Skeleton className="h-8 w-8 rounded shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-7 sm:h-8 w-40 sm:w-56" />
          <Skeleton className="h-4 w-48 sm:w-64" />
          <div className="flex gap-4 mt-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center justify-center p-3 sm:p-4 gap-2">
                <Skeleton className="h-7 w-16 sm:w-20" />
                <Skeleton className="h-4 w-20 sm:w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Range Selector */}
      <div className="flex flex-wrap gap-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-7 sm:h-8 w-10 sm:w-12 rounded-md" />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-3 sm:gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
              <div className="flex flex-1 flex-col justify-center gap-2 px-4 py-3 sm:px-6 sm:py-5">
                <Skeleton className="h-5 w-28 sm:w-32" />
                <Skeleton className="h-3.5 w-36 sm:w-44" />
              </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
              <Skeleton className="h-[200px] sm:h-[250px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-3 sm:gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
              <div className="flex flex-1 flex-col justify-center gap-2 px-4 py-3 sm:px-6 sm:py-5">
                <Skeleton className="h-5 w-24 sm:w-28" />
                <Skeleton className="h-3.5 w-32 sm:w-40" />
              </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
              <Skeleton className="h-[200px] sm:h-[250px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trades Table */}
      <Card>
        <CardHeader className="px-4 sm:px-6">
          <Skeleton className="h-6 w-36 sm:w-48" />
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
