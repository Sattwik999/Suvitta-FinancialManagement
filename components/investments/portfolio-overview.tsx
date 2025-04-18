"use client"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

export function PortfolioOverview() {
  // Data for the doughnut chart
  const chartData = {
    labels: ["Stocks", "Bonds", "ETFs", "Mutual Funds", "Cash"],
    datasets: [
      {
        data: [85000, 25000, 20000, 12000, 3920.45],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#6b7280"],
        borderColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#6b7280"],
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

  const totalValue = chartData.datasets[0].data.reduce((sum, value) => sum + value, 0)

  return (
    <div className="space-y-6">
      <div className="h-[250px] relative">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-sm text-muted-foreground">Total Value</span>
          <span className="text-2xl font-bold">₹{totalValue.toLocaleString()}</span>
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
            <div className="text-right">
              <span className="text-sm font-medium">₹{chartData.datasets[0].data[index].toLocaleString()}</span>
              <span className="text-xs text-muted-foreground ml-2">
                ({((chartData.datasets[0].data[index] / totalValue) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Risk Level</span>
            <span className="text-sm text-muted-foreground">Moderate</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Diversification Score</span>
            <span className="text-sm text-muted-foreground">Good</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
      </div>

      <Button variant="outline" className="w-full">
        View Detailed Analysis <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
