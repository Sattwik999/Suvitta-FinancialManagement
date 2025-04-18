import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

const paymentHistory = [
  {
    id: "H-1234",
    recipient: "Rent",
    amount: 1800.0,
    date: "2023-07-01",
    status: "completed",
    category: "Housing",
  },
  {
    id: "H-1235",
    recipient: "Electric Company",
    amount: 120.5,
    date: "2023-07-05",
    status: "completed",
    category: "Utilities",
  },
  {
    id: "H-1236",
    recipient: "Internet Provider",
    amount: 89.99,
    date: "2023-07-05",
    status: "completed",
    category: "Utilities",
  },
  {
    id: "H-1237",
    recipient: "Credit Card",
    amount: 950.75,
    date: "2023-07-10",
    status: "completed",
    category: "Credit Card",
  },
  {
    id: "H-1238",
    recipient: "Water Bill",
    amount: 45.3,
    date: "2023-07-12",
    status: "completed",
    category: "Utilities",
  },
  {
    id: "H-1239",
    recipient: "Phone Bill",
    amount: 85.0,
    date: "2023-07-15",
    status: "failed",
    category: "Utilities",
  },
  {
    id: "H-1240",
    recipient: "Car Loan",
    amount: 450.75,
    date: "2023-07-15",
    status: "completed",
    category: "Auto",
  },
]

const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
}

export function PaymentHistory() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentHistory.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.recipient}</TableCell>
                <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[payment.status]}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{payment.category}</Badge>
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">View Receipt</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {paymentHistory.length === 0 && (
        <div className="flex h-[150px] flex-col items-center justify-center rounded-md border border-dashed">
          <p className="text-sm text-muted-foreground">No payment history</p>
        </div>
      )}
    </div>
  )
}
