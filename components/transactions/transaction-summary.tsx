"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"

const monthlyData = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 9800 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "Jun", income: 2390, expenses: 3800 },
  { name: "Jul", income: 3490, expenses: 4300 },
]

const categoryData = [
  { name: "Shopping", amount: 1200 },
  { name: "Groceries", amount: 900 },
  { name: "Entertainment", amount: 500 },
  { name: "Transportation", amount: 700 },
  { name: "Dining", amount: 800 },
  { name: "Utilities", amount: 600 },
  { name: "Other", amount: 400 },
]

export function TransactionSummary() {
  const { theme } = useTheme()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Transaction Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="mb-4">
            <TabsTrigger value="monthly">Monthly Overview</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="name" stroke={theme === "dark" ? "#888888" : "#333333"} />
                  <YAxis stroke={theme === "dark" ? "#888888" : "#333333"} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke={theme === "dark" ? "#adfa1d" : "#0ea5e9"}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke={theme === "dark" ? "#ef4444" : "#f43f5e"}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="category">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" stroke={theme === "dark" ? "#888888" : "#333333"} />
                  <YAxis stroke={theme === "dark" ? "#888888" : "#333333"} />
                  <Tooltip />
                  <Bar dataKey="amount" fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
