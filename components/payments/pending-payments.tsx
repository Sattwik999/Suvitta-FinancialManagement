import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

const pendingPayments = [
  {
    id: "P-1234",
    recipient: "Electric Company",
    amount: 120.5,
    dueDate: "2025-07-25",
    category: "Utilities",
  },
  {
    id: "P-1235",
    recipient: "Internet Provider",
    amount: 89.99,
    dueDate: "2025-07-28",
    category: "Utilities",
  },
  {
    id: "P-1236",
    recipient: "Credit Card",
    amount: 1029.51,
    dueDate: "2025-08-01",
    category: "Credit Card",
  },
]

export function PendingPayments() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.recipient}</TableCell>
                <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.dueDate}</TableCell>
                <TableCell>
                  <Badge variant="outline">{payment.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="h-8 gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Pay Now
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                      <XCircle className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pendingPayments.length === 0 && (
        <div className="flex h-[150px] flex-col items-center justify-center rounded-md border border-dashed">
          <p className="text-sm text-muted-foreground">No pending payments</p>
        </div>
      )}
    </div>
  )
}
