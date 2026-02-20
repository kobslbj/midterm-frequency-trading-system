import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ClipboardList, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Orders
        </h2>
        <p className="text-sm text-muted-foreground">
          View and manage all trading orders
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-3 sm:space-y-4">
        <TabsList className="w-full sm:w-auto overflow-x-auto">
          <TabsTrigger value="all" className="text-sm">
            All Orders
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-sm">
            Pending
          </TabsTrigger>
          <TabsTrigger value="filled" className="text-sm">
            Filled
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="text-sm">
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="px-4 sm:px-6 py-3 sm:py-4">
              <CardTitle className="text-base sm:text-lg font-medium">
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="flex flex-col h-[200px] sm:h-[300px] items-center justify-center gap-3 text-muted-foreground">
                <ClipboardList className="h-8 w-8 opacity-40" />
                <p className="text-sm">No order records yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader className="px-4 sm:px-6 py-3 sm:py-4">
              <CardTitle className="text-base sm:text-lg font-medium">
                Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="flex flex-col h-[200px] sm:h-[300px] items-center justify-center gap-3 text-muted-foreground">
                <Clock className="h-8 w-8 opacity-40" />
                <p className="text-sm">No pending orders</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filled">
          <Card>
            <CardHeader className="px-4 sm:px-6 py-3 sm:py-4">
              <CardTitle className="text-base sm:text-lg font-medium">
                Filled Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="flex flex-col h-[200px] sm:h-[300px] items-center justify-center gap-3 text-muted-foreground">
                <CheckCircle2 className="h-8 w-8 opacity-40" />
                <p className="text-sm">No filled orders</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardHeader className="px-4 sm:px-6 py-3 sm:py-4">
              <CardTitle className="text-base sm:text-lg font-medium">
                Cancelled Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="flex flex-col h-[200px] sm:h-[300px] items-center justify-center gap-3 text-muted-foreground">
                <XCircle className="h-8 w-8 opacity-40" />
                <p className="text-sm">No cancelled orders</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
