"use client"

import { Line, LineChart, CartesianGrid, XAxis } from "recharts"
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
  { trade: "1", cumulative: 40.51 },
  { trade: "2", cumulative: 40.11 },
  { trade: "3", cumulative: 50.01 },
  { trade: "4", cumulative: 50.32 },
  { trade: "5", cumulative: 69.28 },
  { trade: "6", cumulative: 61.6 },
  { trade: "7", cumulative: 89.37 },
]

const chartConfig = {
  cumulative: {
    label: "Cumulative PnL ($)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function CumulativeTradePnLChart() {
  const finalPnL = chartData[chartData.length - 1].cumulative

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Cumulative Trade PnL</CardTitle>
          <CardDescription>
            Accumulated profit/loss over time
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Final PnL
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl text-emerald-600 dark:text-emerald-400">
              ${finalPnL.toFixed(2)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="trade"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => `Trade #${value}`}
                />
              }
            />
            <Line
              dataKey="cumulative"
              type="monotone"
              stroke="#34d399"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
