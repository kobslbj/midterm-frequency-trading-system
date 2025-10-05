import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ArrowRight, TrendingUp } from "lucide-react"
import { mockStrategies } from "@/lib/data/mock-strategies"

export default function StrategiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Strategies</h2>
          <p className="text-muted-foreground">
            Manage and monitor your trading strategies
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Strategy
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockStrategies.map((strategy) => (
          <Card key={strategy.id} className="hover:shadow-lg transition-shadow flex flex-col h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {strategy.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {strategy.description}
                  </p>
                </div>
                <Badge
                  variant={strategy.status === "active" ? "default" : "secondary"}
                >
                  {strategy.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="grid grid-cols-3 gap-4 flex-1">
                <div>
                  <p className="text-xs text-muted-foreground">Total Return</p>
                  <p className="text-lg font-bold text-green-600">
                    {strategy.metrics.totalReturn.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                  <p className="text-lg font-bold">
                    {strategy.metrics.sharpeRatio.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                  <p className="text-lg font-bold">
                    {strategy.metrics.winRate.toFixed(2)}%
                  </p>
                </div>
              </div>

              <Link href={`/strategies/${strategy.id}`} className="mt-4">
                <Button className="w-full" variant="outline">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
