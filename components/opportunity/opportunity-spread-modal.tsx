"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DataPoint {
  time: number;
  binancePrice: number;
  bybitPrice: number;
  spread: number;
  spreadPercent: number;
  ma?: number;
  std?: number;
  upper1?: number;
  upper2?: number;
  upper3?: number;
  lower1?: number;
  lower2?: number;
  lower3?: number;
}

interface OpportunitySpreadModalProps {
  symbol: string | null;
}

function formatPrice(price: number): string {
  if (price >= 1000) return price.toFixed(2);
  if (price >= 1) return price.toFixed(4);
  if (price >= 0.01) return price.toFixed(6);
  return price.toFixed(8);
}

// Custom tooltip for spread chart
function SpreadTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: number }) {
  if (!active || !payload || !payload.length) return null;

  const date = new Date(label || 0);
  const spreadData = payload.find((p) => p.dataKey === "spread");
  const maData = payload.find((p) => p.dataKey === "ma");
  const spread = spreadData?.value ?? 0;
  const ma = maData?.value;

  return (
    <div className="bg-background border rounded-lg shadow-lg p-3 text-sm">
      <div className="text-muted-foreground mb-2">
        {date.toLocaleString("en-US", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}
      </div>
      <div className={cn("font-bold", spread > 0 ? "text-emerald-600" : "text-red-600")}>
        Spread: {spread.toFixed(2)} bp
      </div>
      {ma !== undefined && <div className="text-amber-500 mt-1">MA: {ma.toFixed(2)} bp</div>}
    </div>
  );
}

// Custom tooltip for price chart
function PriceTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: number }) {
  if (!active || !payload || !payload.length) return null;

  const date = new Date(label || 0);
  const binanceData = payload.find((p) => p.dataKey === "binancePrice");
  const bybitData = payload.find((p) => p.dataKey === "bybitPrice");

  return (
    <div className="bg-background border rounded-lg shadow-lg p-3 text-sm">
      <div className="text-muted-foreground mb-2">
        {date.toLocaleString("en-US", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}
      </div>
      {binanceData && <div className="text-yellow-500">Binance: ${formatPrice(binanceData.value)}</div>}
      {bybitData && <div className="text-cyan-500">Bybit: ${formatPrice(bybitData.value)}</div>}
    </div>
  );
}

function normalizeSymbol(symbol: string): string {
  return symbol.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const DISPLAY_KLINES = 1440;
const FETCH_KLINES = 2880;
const MA_WINDOW = 1440;

async function fetchBinanceKlines(symbol: string): Promise<[number, number][]> {
  try {
    const allKlines: [number, number][] = [];
    let oldestTime = Date.now();

    for (let i = 0; i < 2 && allKlines.length < FETCH_KLINES; i++) {
      const url = i === 0
        ? `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol.toUpperCase()}&interval=1m&limit=1500`
        : `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol.toUpperCase()}&interval=1m&limit=1500&endTime=${oldestTime - 1}`;

      const response = await fetch(url);
      if (!response.ok) break;
      const data = await response.json();
      const klines: [number, number][] = data.map((k: (string | number)[]) => [Number(k[0]), parseFloat(k[4] as string)]);

      if (klines.length === 0) break;
      allKlines.unshift(...klines);
      oldestTime = klines[0][0];
      if (klines.length < 1500) break;
    }

    return allKlines;
  } catch {
    return [];
  }
}

async function fetchBybitKlines(symbol: string): Promise<[number, number][]> {
  try {
    const allKlines: [number, number][] = [];
    let endTime = Date.now();

    for (let i = 0; i < 3 && allKlines.length < FETCH_KLINES; i++) {
      const url = `https://api.bybit.com/v5/market/kline?category=linear&symbol=${symbol.toUpperCase()}&interval=1&limit=1000&end=${endTime}`;
      const response = await fetch(url);
      if (!response.ok) break;
      const data = await response.json();

      if (data.retCode !== 0 || !data.result?.list?.length) break;

      const klines: [number, number][] = data.result.list.map((k: string[]) => [parseInt(k[0]), parseFloat(k[4])]);
      allKlines.push(...klines);

      const oldestTime = Math.min(...klines.map((k) => k[0]));
      endTime = oldestTime - 1;
      if (klines.length < 1000) break;
    }

    return allKlines.sort((a, b) => a[0] - b[0]);
  } catch {
    return [];
  }
}

function mergeKlinesAndCalculateSpread(binanceKlines: [number, number][], bybitKlines: [number, number][]): DataPoint[] {
  const binanceMap = new Map(binanceKlines);
  const bybitMap = new Map(bybitKlines);
  const allTimestamps = new Set([...binanceKlines.map((k) => k[0]), ...bybitKlines.map((k) => k[0])]);

  const result: DataPoint[] = [];
  let lastBinance = 0;
  let lastBybit = 0;
  const sortedTimestamps = Array.from(allTimestamps).sort((a, b) => a - b);

  for (const ts of sortedTimestamps) {
    const binancePrice = binanceMap.get(ts) ?? lastBinance;
    const bybitPrice = bybitMap.get(ts) ?? lastBybit;

    if (binancePrice > 0 && bybitPrice > 0) {
      lastBinance = binancePrice;
      lastBybit = bybitPrice;

      const spread = bybitPrice - binancePrice;
      const spreadPercent = (spread / binancePrice) * 100;
      const spreadBps = spreadPercent * 100;

      result.push({ time: ts, binancePrice, bybitPrice, spread: spreadBps, spreadPercent });
    }
  }

  // Calculate MA and Bollinger Bands
  for (let i = 0; i < result.length; i++) {
    if (i >= MA_WINDOW - 1) {
      let sum = 0;
      for (let j = i - MA_WINDOW + 1; j <= i; j++) {
        sum += result[j].spread;
      }
      const ma = sum / MA_WINDOW;
      result[i].ma = ma;

      let sumSquaredDiff = 0;
      for (let j = i - MA_WINDOW + 1; j <= i; j++) {
        sumSquaredDiff += Math.pow(result[j].spread - ma, 2);
      }
      const std = Math.sqrt(sumSquaredDiff / MA_WINDOW);
      result[i].std = std;
      result[i].upper1 = ma + std;
      result[i].upper2 = ma + 2 * std;
      result[i].upper3 = ma + 3 * std;
      result[i].lower1 = ma - std;
      result[i].lower2 = ma - 2 * std;
      result[i].lower3 = ma - 3 * std;
    }
  }

  if (result.length > DISPLAY_KLINES) {
    return result.slice(-DISPLAY_KLINES);
  }
  return result;
}

export function OpportunitySpreadModal({ symbol }: OpportunitySpreadModalProps) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSpread, setCurrentSpread] = useState<number | null>(null);
  const [currentPrices, setCurrentPrices] = useState<{ binance: number; bybit: number } | null>(null);
  const binanceWsRef = useRef<WebSocket | null>(null);
  const bybitWsRef = useRef<WebSocket | null>(null);
  const latestPricesRef = useRef<{ binance: number; bybit: number }>({ binance: 0, bybit: 0 });

  // Fetch historical data
  useEffect(() => {
    if (!symbol) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      const [binanceKlines, bybitKlines] = await Promise.all([
        fetchBinanceKlines(symbol),
        fetchBybitKlines(symbol),
      ]);

      const mergedData = mergeKlinesAndCalculateSpread(binanceKlines, bybitKlines);
      setData(mergedData);

      if (mergedData.length > 0) {
        const latest = mergedData[mergedData.length - 1];
        setCurrentSpread(latest.spread);
        setCurrentPrices({ binance: latest.binancePrice, bybit: latest.bybitPrice });
        latestPricesRef.current = { binance: latest.binancePrice, bybit: latest.bybitPrice };
      }
      setIsLoading(false);
    };

    fetchData();
  }, [symbol]);

  // WebSocket for real-time updates
  useEffect(() => {
    if (!symbol) return;

    const normalizedSymbol = normalizeSymbol(symbol);

    const binanceWs = new WebSocket(`wss://fstream.binance.com/ws/${normalizedSymbol}@kline_1m`);
    binanceWsRef.current = binanceWs;

    binanceWs.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.e === "kline" && msg.k) {
          latestPricesRef.current.binance = parseFloat(msg.k.c);
          updateCurrentSpread();
        }
      } catch {}
    };

    const bybitWs = new WebSocket("wss://stream.bybit.com/v5/public/linear");
    bybitWsRef.current = bybitWs;

    bybitWs.onopen = () => {
      bybitWs.send(JSON.stringify({ op: "subscribe", args: [`kline.1.${symbol.toUpperCase()}`] }));
    };

    bybitWs.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.topic?.startsWith("kline.") && msg.data?.[0]) {
          latestPricesRef.current.bybit = parseFloat(msg.data[0].close);
          updateCurrentSpread();
        }
      } catch {}
    };

    const updateCurrentSpread = () => {
      const { binance, bybit } = latestPricesRef.current;
      if (binance > 0 && bybit > 0) {
        const spread = bybit - binance;
        const spreadBps = (spread / binance) * 100 * 100;
        setCurrentSpread(spreadBps);
        setCurrentPrices({ binance, bybit });
      }
    };

    return () => {
      binanceWsRef.current?.close();
      bybitWsRef.current?.close();
    };
  }, [symbol]);

  const chartData = useMemo(() => {
    if (data.length <= 2000) return data;
    const step = Math.ceil(data.length / 2000);
    return data.filter((_, i) => i % step === 0);
  }, [data]);

  const spreadYDomain = useMemo(() => {
    if (chartData.length === 0) return [-10, 10];
    const allValues: number[] = [];
    chartData.forEach((d) => {
      allValues.push(d.spread);
      if (d.upper3 !== undefined) allValues.push(d.upper3);
      if (d.lower3 !== undefined) allValues.push(d.lower3);
    });
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1 || 5;
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [chartData]);

  const priceYDomain = useMemo(() => {
    if (chartData.length === 0) return [0, 100];
    const allPrices = chartData.flatMap((d) => [d.binancePrice, d.bybitPrice]);
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    const padding = (max - min) * 0.05 || 1;
    return [min - padding, max + padding];
  }, [chartData]);

  if (!symbol) return null;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        載入歷史數據中...
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        無可用數據
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header with current values */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-lg px-3 py-1">{symbol}</Badge>
          <span className="text-sm text-muted-foreground">(1天 / MA 1440)</span>
          <div className="flex items-center gap-3 ml-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span className="text-muted-foreground">Spread</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-amber-500"></div>
              <span className="text-muted-foreground">MA</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-purple-400"></div>
              <span className="text-muted-foreground">±1σ</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          {currentPrices && (
            <>
              <div>
                <span className="text-yellow-500">Binance: </span>
                <span className="font-mono">${formatPrice(currentPrices.binance)}</span>
              </div>
              <div>
                <span className="text-cyan-500">Bybit: </span>
                <span className="font-mono">${formatPrice(currentPrices.bybit)}</span>
              </div>
            </>
          )}
          {currentSpread !== null && (
            <div className={cn("font-bold text-lg", currentSpread > 0 ? "text-emerald-500" : "text-red-500")}>
              {currentSpread > 0 ? "+" : ""}{currentSpread.toFixed(2)} bp
            </div>
          )}
        </div>
      </div>

      {/* Spread Chart */}
      <div className="flex-1 min-h-0">
        <div className="text-sm text-muted-foreground mb-1">價差走勢 (Bybit - Binance)</div>
        <div className="h-[calc(100%-20px)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ left: 50, right: 20, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={100}
                tick={{ fontSize: 11, fill: "#888888" }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={spreadYDomain}
                tick={{ fontSize: 11, fill: "#888888" }}
                tickFormatter={(value) => `${value}bp`}
              />
              <Tooltip content={<SpreadTooltip />} />
              <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="upper3" stroke="#d8b4fe" strokeWidth={1} dot={false} isAnimationActive={false} connectNulls={false} />
              <Line type="monotone" dataKey="lower3" stroke="#d8b4fe" strokeWidth={1} dot={false} isAnimationActive={false} connectNulls={false} />
              <Line type="monotone" dataKey="upper2" stroke="#c084fc" strokeWidth={1} dot={false} isAnimationActive={false} connectNulls={false} />
              <Line type="monotone" dataKey="lower2" stroke="#c084fc" strokeWidth={1} dot={false} isAnimationActive={false} connectNulls={false} />
              <Line type="monotone" dataKey="upper1" stroke="#a855f7" strokeWidth={1} dot={false} isAnimationActive={false} connectNulls={false} />
              <Line type="monotone" dataKey="lower1" stroke="#a855f7" strokeWidth={1} dot={false} isAnimationActive={false} connectNulls={false} />
              <Line type="monotone" dataKey="ma" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} connectNulls={false} />
              <Line type="monotone" dataKey="spread" stroke="#3b82f6" strokeWidth={1.5} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Price Chart */}
      <div className="flex-1 min-h-0">
        <div className="text-sm text-muted-foreground mb-1">價格走勢</div>
        <div className="h-[calc(100%-20px)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ left: 50, right: 20, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={100}
                tick={{ fontSize: 11, fill: "#888888" }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={priceYDomain}
                tick={{ fontSize: 11, fill: "#888888" }}
                tickFormatter={(value) => `$${formatPrice(value)}`}
              />
              <Tooltip content={<PriceTooltip />} />
              <Line type="monotone" dataKey="binancePrice" name="Binance" stroke="#eab308" strokeWidth={1.5} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="bybitPrice" name="Bybit" stroke="#06b6d4" strokeWidth={1.5} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
