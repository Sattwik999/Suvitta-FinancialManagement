import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioOverview } from "@/components/investments/portfolio-overview"
import { StockList } from "@/components/investments/stock-list"
import { InvestmentPerformance } from "@/components/investments/investment-performance"
import { MarketNews } from "@/components/investments/market-news"
import { NewInvestmentButton } from "@/components/investments/new-investment-button"
import { TrendingUp, BarChart2, DollarSign } from "lucide-react"

export default function InvestmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">Stocks & Investments</h1>
        <div className="flex items-center gap-2">
          <NewInvestmentButton />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹145,920.45</div>
            <p className="text-xs text-muted-foreground">+₹7,560.12 (5.2%) this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Gain/Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+₹1,245.30</div>
            <p className="text-xs text-muted-foreground">+0.85% today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+₹12,450.80</div>
            <p className="text-xs text-muted-foreground">+8.5% since Jan 1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Indices</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">S&P 500</span>
                <span className="text-sm text-green-600">+0.75%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">NASDAQ</span>
                <span className="text-sm text-green-600">+1.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">DOW</span>
                <span className="text-sm text-red-600">-0.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Portfolio Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <PortfolioOverview />
              </TabsContent>
              <TabsContent value="stocks">
                <StockList />
              </TabsContent>
              <TabsContent value="performance">
                <InvestmentPerformance />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Market News</CardTitle>
          </CardHeader>
          <CardContent>
            <MarketNews />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
