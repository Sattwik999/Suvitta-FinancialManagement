import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const stocks = [
  {
    id: "AAPL",
    name: "Apple Inc.",
    shares: 50,
    avgPrice: 150.25,
    currentPrice: 175.5,
    change: 2.5,
    marketValue: 8775.0,
    gainLoss: 1262.5,
    sector: "Technology",
  },
  {
    id: "MSFT",
    name: "Microsoft Corporation",
    shares: 30,
    avgPrice: 240.75,
    currentPrice: 280.1,
    change: 1.8,
    marketValue: 8403.0,
    gainLoss: 1180.5,
    sector: "Technology",
  },
  {
    id: "AMZN",
    name: "Amazon.com Inc.",
    shares: 15,
    avgPrice: 3100.5,
    currentPrice: 3250.0,
    change: -0.5,
    marketValue: 48750.0,
    gainLoss: 2242.5,
    sector: "Consumer Cyclical",
  },
  {
    id: "GOOGL",
    name: "Alphabet Inc.",
    shares: 10,
    avgPrice: 2500.0,
    currentPrice: 2750.25,
    change: 1.2,
    marketValue: 27502.5,
    gainLoss: 2502.5,
    sector: "Communication Services",
  },
  {
    id: "TSLA",
    name: "Tesla Inc.",
    shares: 20,
    avgPrice: 700.5,
    currentPrice: 650.75,
    change: -2.1,
    marketValue: 13015.0,
    gainLoss: -995.0,
    sector: "Consumer Cyclical",
  },
  {
    id: "JPM",
    name: "JPMorgan Chase & Co.",
    shares: 25,
    avgPrice: 140.25,
    currentPrice: 155.8,
    change: 0.8,
    marketValue: 3895.0,
    gainLoss: 388.75,
    sector: "Financial Services",
  },
  {
    id: "JNJ",
    name: "Johnson & Johnson",
    shares: 15,
    avgPrice: 160.0,
    currentPrice: 165.3,
    change: 0.3,
    marketValue: 2479.5,
    gainLoss: 79.5,
    sector: "Healthcare",
  },
]

export function StockList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Shares</TableHead>
            <TableHead>Current Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Market Value</TableHead>
            <TableHead>Gain/Loss</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell>
                <div className="font-medium">{stock.id}</div>
                <div className="text-xs text-muted-foreground">{stock.name}</div>
              </TableCell>
              <TableCell>{stock.shares}</TableCell>
              <TableCell>${stock.currentPrice.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change}%
                  </span>
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </TableCell>
              <TableCell>${stock.marketValue.toFixed(2)}</TableCell>
              <TableCell>
                <span className={stock.gainLoss >= 0 ? "text-green-600" : "text-red-600"}>
                  {stock.gainLoss >= 0 ? "+" : ""}${Math.abs(stock.gainLoss).toFixed(2)}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Buy more</DropdownMenuItem>
                    <DropdownMenuItem>Sell</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Set alert</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
