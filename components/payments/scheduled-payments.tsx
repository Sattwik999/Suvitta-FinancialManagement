import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

const scheduledPayments = [
  {
    id: "S-1234",
    recipient: "Rent",
    amount: 1800.0,
    scheduledDate: "2025-08-01",
    recurrence: "Monthly",
    category: "Housing",
  },
  {
    id: "S-1235",
    recipient: "Car Loan",
    amount: 450.75,
    scheduledDate: "2025-08-05",
    recurrence: "Monthly",
    category: "Auto",
  },
  {
    id: "S-1236",
    recipient: "Netflix",
    amount: 15.99,
    scheduledDate: "2025-08-10",
    recurrence: "Monthly",
    category: "Entertainment",
  },
  {
    id: "S-1237",
    recipient: "Gym Membership",
    amount: 49.99,
    scheduledDate: "2025-08-15",
    recurrence: "Monthly",
    category: "Health",
  },
  {
    id: "S-1238",
    recipient: "Phone Bill",
    amount: 85.0,
    scheduledDate: "2025-08-20",
    recurrence: "Monthly",
    category: "Utilities",
  },
  {
    id: "S-1239",
    recipient: "Insurance",
    amount: 120.5,
    scheduledDate: "2025-08-25",
    recurrence: "Monthly",
    category: "Insurance",
  },
  {
    id: "S-1240",
    recipient: "Student Loan",
    amount: 350.0,
    scheduledDate: "2025-08-28",
    recurrence: "Monthly",
    category: "Loans",
  },
]

export function ScheduledPayments() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Recurrence</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduledPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.recipient}</TableCell>
                <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.scheduledDate}</TableCell>
                <TableCell>{payment.recurrence}</TableCell>
                <TableCell>
                  <Badge variant="outline">{payment.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {scheduledPayments.length === 0 && (
        <div className="flex h-[150px] flex-col items-center justify-center rounded-md border border-dashed">
          <p className="text-sm text-muted-foreground">No scheduled payments</p>
        </div>
      )}
    </div>
  )
}
