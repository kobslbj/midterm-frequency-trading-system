export type StrategyStatus = "active" | "paused" | "stopped" | "error"

export type StrategyType = "mean-reversion" | "momentum" | "arbitrage" | "custom"

export interface StrategyMetrics {
  // Trading Statistics
  totalTrades: number
  profitableTrades: number
  losingTrades: number
  winRate: number // percentage
  averageHoldingPeriods: number // in days

  // Return Metrics
  totalProfit: number // dollar amount
  totalReturn: number // percentage
  annualizedReturn: number // percentage
  averageProfitPerTrade: number // dollar amount
  averageProfitPercentPerTrade: number // percentage

  // Risk Metrics
  sharpeRatio: number
  sortinoRatio: number
  maxDrawdown: number // percentage
  maxDrawdownDuration: number // in days
  calmarRatio: number

  // Trade Quality Metrics
  averageWin: number // dollar amount
  averageLoss: number // dollar amount
  winLossRatio: number
  profitFactor: number
  expectancy: number // dollar amount
  systemQualityNumber: number

  // Cost & Time Metrics
  totalFees: number // dollar amount
  tradingDays: number
  tradingYears: number
}

export interface Strategy {
  id: string
  name: string
  type: StrategyType
  status: StrategyStatus
  description?: string
  parameters: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
  metrics: StrategyMetrics
}

export interface StrategyFormData {
  name: string
  type: StrategyType
  description?: string
  parameters: Record<string, unknown>
}
