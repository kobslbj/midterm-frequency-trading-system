export type OrderSide = "buy" | "sell"

export type OrderType = "market" | "limit" | "stop" | "stop-limit"

export type OrderStatus =
  | "pending"
  | "submitted"
  | "partial-filled"
  | "filled"
  | "cancelled"
  | "rejected"

export interface Order {
  id: string
  strategyId: string
  symbol: string
  side: OrderSide
  type: OrderType
  status: OrderStatus
  quantity: number
  price?: number
  stopPrice?: number
  filledQuantity: number
  averagePrice?: number
  createdAt: Date
  updatedAt: Date
  executedAt?: Date
}

export interface OrderFormData {
  strategyId: string
  symbol: string
  side: OrderSide
  type: OrderType
  quantity: number
  price?: number
  stopPrice?: number
}
