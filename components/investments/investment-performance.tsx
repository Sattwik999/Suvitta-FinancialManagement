"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"

const performanceData = {
  "1M": [
    { date: "Jun 15", value: 140000 },
    { date: "Jun 22", value: 142500 },
    { date: "Jun 29", value: 141800 },
    { date: "Jul 06", value: 143200 },
    { date: "Jul 13", value: 144500 },
    { date: "Jul 20", value: 145920 },
  ],
  "3M": [
    { date: "Apr 20", value: 135000 },
    { date: "May 01", value: 137500 },
    { date: "May 15", value: 136800 },
    { date: "Jun 01", value: 139200 },
    { date: "Jun 15", value: 140000 },
    { date: "Jul 01", value: 143500 },
    { date: "Jul 20", value: 145920 },
  ],
  "1Y": [
    { date: "Jul 2022", value: 120000 },
    { date: "Sep 2022", value: 118500 },
    { date: "Nov 2022", value: 125000 },
    { date: "Jan 2023", value: 130000 },
    { date: "Mar 2023", value: 135000 },
    { date: "May 2023", value: 140000 },
    { date: "Jul 2023", value: 145920 },
  ],
  All: [
    { date: "Jul 2020", value: 80000 },
    { date: "Jan 2021", value: 95000 },
    { date: "Jul 2021", value: 105000 },
    { date: "Jan 2022", value: 115000 },
    { date: "Jul 2022", value: 120000 },
    { date: "Jan 2023", value: 130000 },
    { date: "Jul 2023", value: 145920 },
  ],
}

export function InvestmentPerformance() {
  const { theme } = useTheme()

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card className="border-none shadow-lg">
          <CardContent className="p-2">
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-sm text-muted-foreground">Value: ${payload[0].value.toLocaleString()}</p>
          </CardContent>
        </Card>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="1M">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="1M">1M</TabsTrigger>
          <TabsTrigger value="3M">3M</TabsTrigger>
          <TabsTrigger value="1Y">1Y</TabsTrigger>
          <TabsTrigger value="All">All</TabsTrigger>
        </TabsList>
        {Object.keys(performanceData).map((period) => (
          <TabsContent key={period} value={period}>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData[period]}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                    dataKey="date"
                    stroke={theme === "dark" ? "#888888" : "#333333"}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke={theme === "dark" ? "#888888" : "#333333"}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-between text-sm">
              <div>
                <p className="text-muted-foreground">Starting Value</p>
                <p className="font-medium">₹{performanceData[period][0].value.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Value</p>
                <p className="font-medium">
                  ${performanceData[period][performanceData[period].length - 1].value.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Change</p>
                <p className="font-medium text-green-600">
                  +$
                  {(
                    performanceData[period][performanceData[period].length - 1].value - performanceData[period][0].value
                  ).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">% Change</p>
                <p className="font-medium text-green-600">
                  +
                  {(
                    ((performanceData[period][performanceData[period].length - 1].value -
                      performanceData[period][0].value) /
                      performanceData[period][0].value) *
                    100
                  ).toFixed(2)}
                  %
                </p>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
