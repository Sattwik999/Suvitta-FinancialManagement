import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const accounts = [
  {
    id: "A-1234",
    name: "Primary Checking",
    type: "Checking",
    balance: 12580.25,
    status: "active",
    accountNumber: "****4567",
  },
  {
    id: "A-1235",
    name: "High-Yield Savings",
    type: "Savings",
    balance: 48750.8,
    status: "active",
    accountNumber: "****7890",
  },
  {
    id: "A-1236",
    name: "Rewards Credit Card",
    type: "Credit Card",
    balance: 2450.15,
    status: "active",
    accountNumber: "****1234",
  },
  {
    id: "A-1237",
    name: "Investment Portfolio",
    type: "Investment",
    balance: 145920.45,
    status: "active",
    accountNumber: "****5678",
  },
  {
    id: "A-1238",
    name: "Emergency Fund",
    type: "Savings",
    balance: 15000.0,
    status: "active",
    accountNumber: "****9012",
  },
  {
    id: "A-1239",
    name: "Travel Savings",
    type: "Savings",
    balance: 5200.5,
    status: "active",
    accountNumber: "****3456",
  },
  {
    id: "A-1240",
    name: "Business Checking",
    type: "Checking",
    balance: 8750.3,
    status: "inactive",
    accountNumber: "****7891",
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  frozen: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
}

export function AccountsList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="font-medium">{account.name}</TableCell>
              <TableCell>{account.type}</TableCell>
              <TableCell>{account.accountNumber}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusColors[account.status]}>
                  {account.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span>₹{account.balance.toFixed(2)}</span>
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
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
                    <DropdownMenuItem>Transfer funds</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Download statements</DropdownMenuItem>
                    <DropdownMenuItem>Update settings</DropdownMenuItem>
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
