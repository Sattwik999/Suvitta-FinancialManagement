import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const transactions = [
  {
    id: "T-1234",
    date: "2023-07-15",
    name: "Amazon.com",
    type: "expense",
    category: "Shopping",
    amount: 129.99,
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "T-1235",
    date: "2023-07-14",
    name: "Salary Deposit",
    type: "income",
    category: "Salary",
    amount: 3500.0,
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "T-1236",
    date: "2023-07-13",
    name: "Whole Foods Market",
    type: "expense",
    category: "Groceries",
    amount: 89.72,
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "T-1237",
    date: "2023-07-12",
    name: "Freelance Payment",
    type: "income",
    category: "Freelance",
    amount: 750.0,
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "T-1238",
    date: "2023-07-11",
    name: "Netflix Subscription",
    type: "expense",
    category: "Entertainment",
    amount: 15.99,
    status: "pending",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "T-1239",
    date: "2023-07-10",
    name: "Gas Station",
    type: "expense",
    category: "Transportation",
    amount: 45.5,
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "T-1240",
    date: "2023-07-09",
    name: "Dividend Payment",
    type: "income",
    category: "Investment",
    amount: 120.35,
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export function TransactionList() {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={transaction.avatar || "/placeholder.svg"} alt={transaction.name} />
                    <AvatarFallback>{transaction.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{transaction.name}</span>
                    <span className="text-xs text-muted-foreground">{transaction.id}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusColors[transaction.status]}>
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                    {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toFixed(2)}
                  </span>
                  {transaction.type === "income" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  )}
                </div>
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
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Export receipt</DropdownMenuItem>
                    <DropdownMenuItem>Report issue</DropdownMenuItem>
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
