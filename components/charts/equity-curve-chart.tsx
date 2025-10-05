"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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
  { time: "52518", equity: 392.77 },
  { time: "61271", equity: 402.56 },
  { time: "70024", equity: 402.56 },
  { time: "78777", equity: 402.18 },
  { time: "87530", equity: 400.88 },
  { time: "96283", equity: 392.81 },
  { time: "105036", equity: 392.81 },
  { time: "113789", equity: 393.87 },
  { time: "122542", equity: 412.08 },
  { time: "131295", equity: 412.06 },
  { time: "140048", equity: 415.17 },
  { time: "148801", equity: 423.55 },
  { time: "157554", equity: 423.55 },
  { time: "166307", equity: 420.96 },
  { time: "175060", equity: 427.73 },
]

const chartConfig = {
  equity: {
    label: "Equity ($)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function EquityCurveChart() {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Equity Curve</CardTitle>
          <CardDescription>
            Portfolio equity over time
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Current Equity
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl text-emerald-600 dark:text-emerald-400">
              ${chartData[chartData.length - 1].equity.toFixed(2)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="fillEquity" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => `Time: ${value}`}
                />
              }
            />
            <Area
              dataKey="equity"
              type="monotone"
              fill="#34d399"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
