import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default function BacktestPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">回測功能</h2>
          <p className="text-muted-foreground">
            測試您的交易策略歷史表現
          </p>
        </div>
        <Button>
          <Play className="mr-2 h-4 w-4" />
          開始回測
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>回測設定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
              回測參數設定區域
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>回測結果</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
              尚未執行回測
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
