interface MetricItemProps {
  label: string
  value: number | string
  format?: "number" | "percentage" | "currency" | "days" | "text"
  decimals?: number
}

export function MetricItem({
  label,
  value,
  format = "number",
  decimals = 2,
}: MetricItemProps) {
  const formatValue = (val: number | string): string => {
    if (typeof val === "string") return val

    switch (format) {
      case "percentage":
        return `${val.toFixed(decimals)}%`
      case "currency":
        return `$${val.toFixed(decimals)}`
      case "days":
        return `${val.toLocaleString()} days`
      case "number":
      default:
        return val.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
    }
  }

  const getValueColor = () => {
    if (format === "currency" && typeof value === "number") {
      return value >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
    }
    return "text-foreground"
  }

  return (
    <div className="flex items-center justify-between py-2.5 border-b last:border-b-0 border-border/50">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className={`text-sm font-semibold tabular-nums ${getValueColor()}`}>
        {formatValue(value)}
      </span>
    </div>
  )
}
