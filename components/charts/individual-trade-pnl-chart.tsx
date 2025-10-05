"use client"

import { Bar, BarChart, CartesianGrid, XAxis, Cell, ReferenceLine } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { trade: "1", pnl: 28.5 },
  { trade: "2", pnl: -3.2 },
  { trade: "3", pnl: 12.8 },
  { trade: "4", pnl: 18.1 },
  { trade: "5", pnl: -2.5 },
  { trade: "6", pnl: 27.3 },
]

const chartConfig = {
  pnl: {
    label: "Trade PnL ($)",
  },
  profit: {
    label: "Profit",
    color: "hsl(142 76% 36%)",
  },
  loss: {
    label: "Loss",
    color: "hsl(0 84% 60%)",
  },
} satisfies ChartConfig

export function IndividualTradePnLChart() {
  const totalPnL = chartData.reduce((acc, curr) => acc + curr.pnl, 0)

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Individual Trade PnL</CardTitle>
          <CardDescription>
            Profit/Loss per trade
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Total PnL
            </span>
            <span className={`text-lg font-bold leading-none sm:text-3xl ${totalPnL >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              ${totalPnL.toFixed(2)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="lossGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#f87171" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#f87171" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="trade"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => `Trade #${value}`}
                />
              }
            />
            <Bar
              dataKey="pnl"
              radius={4}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.pnl >= 0 ? "url(#profitGradient)" : "url(#lossGradient)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
