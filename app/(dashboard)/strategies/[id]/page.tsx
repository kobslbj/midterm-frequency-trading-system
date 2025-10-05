import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp } from "lucide-react"
import { getStrategyById } from "@/lib/data/mock-strategies"
import { MetricItem } from "@/components/dashboard/metric-item"
import { EquityCurveChart } from "@/components/charts/equity-curve-chart"
import { DrawdownChart } from "@/components/charts/drawdown-chart"
import { IndividualTradePnLChart } from "@/components/charts/individual-trade-pnl-chart"
import { CumulativeTradePnLChart } from "@/components/charts/cumulative-trade-pnl-chart"

interface StrategyDetailPageProps {
  params: {
    id: string
  }
}

export default function StrategyDetailPage({ params }: StrategyDetailPageProps) {
  const strategy = getStrategyById(params.id)

  if (!strategy) {
    notFound()
  }

  const { metrics } = strategy

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-6 pb-6 border-b">
        <Link href="/strategies">
          <Button variant="ghost" size="icon" className="mt-1">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold tracking-tight">{strategy.name}</h1>
              <p className="text-lg text-muted-foreground">{strategy.description}</p>
            </div>
            <Badge
              variant={strategy.status === "active" ? "default" : "secondary"}
              className="text-sm px-4 py-1"
            >
              {strategy.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Metrics Grid - Airbnb-inspired clean layout */}
      <div className="space-y-6">
        {/* First Row: 3 Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Trading Statistics */}
          <Card className="border-1 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Trading Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <MetricItem label="Total Trades" value={metrics.totalTrades} format="number" decimals={0} />
              <MetricItem label="Profitable Trades" value={metrics.profitableTrades} format="number" decimals={0} />
              <MetricItem label="Losing Trades" value={metrics.losingTrades} format="number" decimals={0} />
              <MetricItem label="Win Rate" value={metrics.winRate} format="percentage" />
              <MetricItem label="Average Holding Periods" value={metrics.averageHoldingPeriods} format="number" />
            </CardContent>
          </Card>

          {/* Return Metrics */}
          <Card className="border-1 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Return Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <MetricItem label="Total Profit" value={metrics.totalProfit} format="currency" />
              <MetricItem label="Total Return" value={metrics.totalReturn} format="percentage" />
              <MetricItem label="Annualized Return" value={metrics.annualizedReturn} format="percentage" />
              <MetricItem label="Average Profit per Trade" value={metrics.averageProfitPerTrade} format="currency" />
              <MetricItem label="Average Profit % per Trade" value={metrics.averageProfitPercentPerTrade} format="percentage" />
            </CardContent>
          </Card>

          {/* Risk Metrics */}
          <Card className="border-1 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <MetricItem label="Sharpe Ratio" value={metrics.sharpeRatio} format="number" decimals={4} />
              <MetricItem label="Sortino Ratio" value={metrics.sortinoRatio} format="number" decimals={4} />
              <MetricItem label="Maximum Drawdown" value={metrics.maxDrawdown} format="percentage" />
              <MetricItem label="Max Drawdown Duration" value={metrics.maxDrawdownDuration} format="days" />
              <MetricItem label="Calmar Ratio" value={metrics.calmarRatio} format="number" decimals={4} />
            </CardContent>
          </Card>
        </div>

        {/* Second Row: 2 Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Trade Quality Metrics */}
          <Card className="border-1 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Trade Quality Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <MetricItem label="Average Win" value={metrics.averageWin} format="currency" />
              <MetricItem label="Average Loss" value={metrics.averageLoss} format="currency" />
              <MetricItem label="Win/Loss Ratio" value={metrics.winLossRatio} format="number" decimals={4} />
              <MetricItem label="Profit Factor" value={metrics.profitFactor} format="number" decimals={4} />
              <MetricItem label="Expectancy" value={metrics.expectancy} format="currency" />
              <MetricItem label="System Quality Number" value={metrics.systemQualityNumber} format="number" decimals={4} />
            </CardContent>
          </Card>

          {/* Cost & Time Metrics */}
          <Card className="border-1 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Cost & Time Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <MetricItem label="Total Fees" value={metrics.totalFees} format="currency" />
              <MetricItem label="Trading Days" value={metrics.tradingDays} format="number" decimals={0} />
              <MetricItem label="Trading Years" value={metrics.tradingYears} format="number" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Performance Charts</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <EquityCurveChart />
          <DrawdownChart />
        </div>

        <div className="grid gap-6 grid-cols-1">
          <IndividualTradePnLChart />
          <CumulativeTradePnLChart />
        </div>
      </div>
    </div>
  )
}
