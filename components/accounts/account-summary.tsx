"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from "chart.js"

// Register Chart.js components
ChartJS.register(ArcElement, ChartTooltip, Legend)

export function AccountSummary() {
  // Data for the doughnut chart
  const chartData = {
    labels: ["Checking", "Savings", "Credit Card", "Investments"],
    datasets: [
      {
        data: [12580.25, 68951.3, 2450.15, 145920.45],
        backgroundColor: ["#3b82f6", "#10b981", "#f43f5e", "#8b5cf6"],
        borderColor: ["#3b82f6", "#10b981", "#f43f5e", "#8b5cf6"],
        borderWidth: 1,
      },
    ],
  }

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "70%",
  }

  const totalBalance = chartData.datasets[0].data.reduce((sum, value) => sum + value, 0)

  return (
    <div className="space-y-6">
      <div className="h-[200px] relative">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-sm text-muted-foreground">Total Balance</span>
          <span className="text-2xl font-bold">${totalBalance.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2">
        {chartData.labels.map((label, index) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
              ></div>
              <span className="text-sm">{label}</span>
            </div>
            <span className="text-sm font-medium">${chartData.datasets[0].data[index].toLocaleString()}</span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Savings Goal</span>
            <span className="text-sm text-muted-foreground">₹100,000 / ₹150,000</span>
          </div>
          <Progress value={66.7} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Debt Reduction</span>
            <span className="text-sm text-muted-foreground">₹2,450 / ₹10,000</span>
          </div>
          <Progress value={75.5} className="h-2" />
        </div>
      </div>

      <Button variant="outline" className="w-full">
        View Detailed Report <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
