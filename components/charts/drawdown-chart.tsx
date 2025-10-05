"use client"

import { Area, AreaChart, CartesianGrid, XAxis, ReferenceLine, ReferenceDot } from "recharts"
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
  { time: "52518", drawdown: -5.63 },
  { time: "61271", drawdown: -3.69 },
  { time: "70024", drawdown: -3.69 },
  { time: "78777", drawdown: -3.48 },
  { time: "87530", drawdown: -6.01 },
  { time: "96283", drawdown: -6.01 },
  { time: "105036", drawdown: -6.77 },
  { time: "113789", drawdown: -1.42 },
  { time: "122542", drawdown: -1.42 },
  { time: "131295", drawdown: -1.79 },
  { time: "140048", drawdown: -1.56 },
  { time: "148801", drawdown: -0.02 },
  { time: "157554", drawdown: -0.02 },
  { time: "166307", drawdown: 0 },
  { time: "175060", drawdown: 0.68 },
]

const chartConfig = {
  drawdown: {
    label: "Drawdown (%)",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig

export function DrawdownChart() {
  const maxDrawdown = Math.min(...chartData.map((d) => d.drawdown))
  const maxDrawdownPoint = chartData.find((d) => d.drawdown === maxDrawdown)

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Drawdown (%)</CardTitle>
          <CardDescription>
            Portfolio drawdown percentage over time
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Max Drawdown
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl text-destructive">
              {maxDrawdown.toFixed(2)}%
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
              <linearGradient id="fillDrawdown" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-drawdown)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-drawdown)"
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
            <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
            {maxDrawdownPoint && (
              <ReferenceDot
                x={maxDrawdownPoint.time}
                y={maxDrawdownPoint.drawdown}
                r={6}
                fill="var(--color-drawdown)"
                stroke="white"
                strokeWidth={2}
              />
            )}
            <Area
              dataKey="drawdown"
              type="monotone"
              fill="#f87171"
              fillOpacity={0.4}
              stroke="var(--color-drawdown)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
