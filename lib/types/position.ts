export interface Position {
  id: string
  strategyId: string
  symbol: string
  quantity: number
  averagePrice: number
  currentPrice: number
  unrealizedPnL: number
  unrealizedPnLPercent: number
  realizedPnL: number
  totalPnL: number
  openedAt: Date
  updatedAt: Date
}

export interface PositionSummary {
  totalPositions: number
  totalValue: number
  totalUnrealizedPnL: number
  totalRealizedPnL: number
  totalPnL: number
  largestPosition: Position | null
  bestPerformer: Position | null
  worstPerformer: Position | null
}
