import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Settings2, BarChart3 } from "lucide-react";

export default function BacktestPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Backtest
          </h2>
          <p className="text-sm text-muted-foreground">
            Test your trading strategies against historical data
          </p>
        </div>
        <Button size="sm" className="w-fit">
          <Play className="mr-1.5 h-3.5 w-3.5" />
          Run Backtest
        </Button>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Settings2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg font-medium">
                  Configuration
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Set parameters and date range
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="flex flex-col h-[180px] sm:h-[240px] items-center justify-center gap-3 text-muted-foreground">
              <Settings2 className="h-8 w-8 opacity-40" />
              <p className="text-sm">Backtest configuration area</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg font-medium">
                  Results
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Performance metrics and charts
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="flex flex-col h-[180px] sm:h-[240px] items-center justify-center gap-3 text-muted-foreground">
              <BarChart3 className="h-8 w-8 opacity-40" />
              <p className="text-sm">No backtest results yet</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
