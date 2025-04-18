"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PaymentModal } from "./payment-modal"
import { useTransactionStore } from "@/store/transaction-store"

const initialBills = [
  { id: 1, name: "Electricity Bill", amount: 2850, dueDate: "2023-07-15" },
  { id: 2, name: "Internet Service", amount: 1200, dueDate: "2023-07-18" },
  { id: 3, name: "Credit Card Payment", amount: 15000, dueDate: "2023-07-25" },
  { id: 4, name: "Water Bill", amount: 750, dueDate: "2023-07-30" },
]

export function QuickBillPay({ onTransaction }) {
  const [bills, setBills] = useState(initialBills)
  const [selectedBill, setSelectedBill] = useState(null)
  const { addTransaction } = useTransactionStore()

  const handlePaymentSuccess = (paidBillId) => {
    const paidBill = bills.find((bill) => bill.id === paidBillId)

    // Add transaction to store
    if (paidBill) {
      addTransaction({
        name: `Paid ${paidBill.name}`,
        amount: paidBill.amount,
        type: "expense",
        category: "Bill Payment",
        status: "completed",
      })

      // Notify parent component
      if (onTransaction) {
        onTransaction({
          name: `Paid ${paidBill.name}`,
          amount: paidBill.amount,
          type: "expense",
          category: "Bill Payment",
          status: "completed",
        })
      }
    }

    setBills(bills.filter((bill) => bill.id !== paidBillId))
    setSelectedBill(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Bill Pay</CardTitle>
      </CardHeader>
      <CardContent>
        {bills.length > 0 ? (
          <div className="space-y-4">
            {bills.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{bill.name}</p>
                  <p className="text-sm text-muted-foreground">Due: {bill.dueDate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">₹{bill.amount.toLocaleString("en-IN")}</span>
                  <Button variant="outline" size="sm" onClick={() => setSelectedBill(bill)}>
                    Pay
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No pending bills</p>
        )}
      </CardContent>
      {selectedBill && (
        <PaymentModal
          bill={selectedBill}
          isOpen={!!selectedBill}
          onClose={() => setSelectedBill(null)}
          onPaymentSuccess={() => handlePaymentSuccess(selectedBill.id)}
        />
      )}
    </Card>
  )
}
