import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">訂單管理</h2>
        <p className="text-muted-foreground">
          查看和管理所有訂單
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">全部訂單</TabsTrigger>
          <TabsTrigger value="pending">待處理</TabsTrigger>
          <TabsTrigger value="filled">已成交</TabsTrigger>
          <TabsTrigger value="cancelled">已取消</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>訂單歷史</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                暫無訂單記錄
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>待處理訂單</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                暫無待處理訂單
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filled">
          <Card>
            <CardHeader>
              <CardTitle>已成交訂單</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                暫無已成交訂單
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>已取消訂單</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                暫無已取消訂單
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
