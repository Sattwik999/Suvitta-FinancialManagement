"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const investments = [
  {
    id: 1,
    name: "Equity Mutual Funds",
    value: 450000,
    growth: 12.5,
    allocation: 45,
  },
  {
    id: 2,
    name: "Stocks",
    value: 320000,
    growth: 8.2,
    allocation: 32,
  },
  {
    id: 3,
    name: "Fixed Deposits",
    value: 150000,
    growth: 6.5,
    allocation: 15,
  },
  {
    id: 4,
    name: "Gold",
    value: 80000,
    growth: 4.8,
    allocation: 8,
  },
]

export function InvestmentCard() {
  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0)

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-purple-800 dark:text-purple-300 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Investments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-2xl font-bold">₹{totalValue.toLocaleString("en-IN")}</p>
          <p className="text-xs text-muted-foreground">Total investment value</p>
        </div>

        <div className="space-y-4">
          {investments.map((investment) => (
            <div key={investment.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{investment.name}</span>
                <span className="text-sm font-medium">₹{investment.value.toLocaleString("en-IN")}</span>
              </div>
              <Progress value={investment.allocation} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{investment.allocation}% of portfolio</span>
                <span className={investment.growth >= 0 ? "text-green-600" : "text-red-600"}>
                  {investment.growth >= 0 ? "+" : ""}
                  {investment.growth}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4" asChild>
          <Link href="/investments">
            View All Investments <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
