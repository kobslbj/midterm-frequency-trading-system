import { Strategy } from "@/lib/types"

export const mockStrategies: Strategy[] = [
  {
    id: "alpha-generator",
    name: "Alpha Generator",
    type: "momentum",
    status: "active",
    description: "Advanced momentum-based strategy focusing on high-quality alpha generation",
    parameters: {},
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2025-01-05"),
    metrics: {
      // Trading Statistics
      totalTrades: 18,
      profitableTrades: 12,
      losingTrades: 6,
      winRate: 66.67,
      averageHoldingPeriods: 5411.89,

      // Return Metrics
      totalProfit: 139.98,
      totalReturn: 38.66,
      annualizedReturn: 118.38,
      averageProfitPerTrade: 7.78,
      averageProfitPercentPerTrade: 2.15,

      // Risk Metrics
      sharpeRatio: 3.6432,
      sortinoRatio: 2.9679,
      maxDrawdown: 9.77,
      maxDrawdownDuration: 93740,
      calmarRatio: 12.1164,

      // Trade Quality Metrics
      averageWin: 15.52,
      averageLoss: -7.70,
      winLossRatio: 2.0142,
      profitFactor: 4.0284,
      expectancy: 7.78,
      systemQualityNumber: 2.1713,

      // Cost & Time Metrics
      totalFees: 2.39,
      tradingDays: 153,
      tradingYears: 0.42,
    },
  },
  {
    id: "five-day-portfolio",
    name: "Five-day Portfolio",
    type: "mean-reversion",
    status: "active",
    description: "Mean reversion strategy with 5-day holding period optimization",
    parameters: {},
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2025-01-05"),
    metrics: {
      // Trading Statistics
      totalTrades: 24,
      profitableTrades: 15,
      losingTrades: 9,
      winRate: 62.5,
      averageHoldingPeriods: 5.0,

      // Return Metrics
      totalProfit: 185.42,
      totalReturn: 42.18,
      annualizedReturn: 95.24,
      averageProfitPerTrade: 7.73,
      averageProfitPercentPerTrade: 1.76,

      // Risk Metrics
      sharpeRatio: 2.8541,
      sortinoRatio: 2.3456,
      maxDrawdown: 12.34,
      maxDrawdownDuration: 45200,
      calmarRatio: 7.7189,

      // Trade Quality Metrics
      averageWin: 18.25,
      averageLoss: -9.15,
      winLossRatio: 1.9945,
      profitFactor: 3.2156,
      expectancy: 7.73,
      systemQualityNumber: 1.8924,

      // Cost & Time Metrics
      totalFees: 3.12,
      tradingDays: 218,
      tradingYears: 0.60,
    },
  },
]

export function getStrategyById(id: string): Strategy | undefined {
  return mockStrategies.find((strategy) => strategy.id === id)
}
