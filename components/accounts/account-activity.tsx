import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const activities = [
  {
    id: "ACT-1234",
    date: "2025-07-20",
    description: "Deposit",
    account: "Primary Checking",
    amount: 1500.0,
    type: "credit",
    balance: 12580.25,
  },
  {
    id: "ACT-1235",
    date: "2025-07-19",
    description: "Grocery Store",
    account: "Primary Checking",
    amount: 125.75,
    type: "debit",
    balance: 11080.25,
  },
  {
    id: "ACT-1236",
    date: "2025-07-18",
    description: "Transfer to Savings",
    account: "Primary Checking",
    amount: 500.0,
    type: "debit",
    balance: 11206.0,
  },
  {
    id: "ACT-1237",
    date: "2025-07-18",
    description: "Transfer from Checking",
    account: "High-Yield Savings",
    amount: 500.0,
    type: "credit",
    balance: 48750.8,
  },
  {
    id: "ACT-1238",
    date: "2025-07-17",
    description: "Restaurant",
    account: "Rewards Credit Card",
    amount: 85.2,
    type: "debit",
    balance: 2450.15,
  },
  {
    id: "ACT-1239",
    date: "2025-07-16",
    description: "Dividend Payment",
    account: "Investment Portfolio",
    amount: 320.45,
    type: "credit",
    balance: 145920.45,
  },
  {
    id: "ACT-1240",
    date: "2025-07-15",
    description: "Online Shopping",
    account: "Rewards Credit Card",
    amount: 150.3,
    type: "debit",
    balance: 2364.95,
  },
]

export function AccountActivity() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>{activity.date}</TableCell>
              <TableCell className="font-medium">{activity.description}</TableCell>
              <TableCell>{activity.account}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className={activity.type === "credit" ? "text-green-600" : "text-red-600"}>
                    {activity.type === "credit" ? "+" : "-"}${activity.amount.toFixed(2)}
                  </span>
                  {activity.type === "credit" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">₹{activity.balance.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
