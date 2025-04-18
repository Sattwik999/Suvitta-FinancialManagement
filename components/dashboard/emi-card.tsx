"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UPIPayment } from "../upi-payment"
import { CardPayment } from "../card-payment"
import { useTransactionStore } from "@/store/transaction-store"

const loans = [
  {
    id: 1,
    name: "Home Loan",
    bank: "HDFC Bank",
    emiAmount: 35000,
    dueDate: "2023-07-25",
    totalAmount: 4500000,
    paidAmount: 1200000,
    remainingTenure: "15 years 3 months",
  },
  {
    id: 2,
    name: "Car Loan",
    bank: "SBI",
    emiAmount: 12500,
    dueDate: "2023-07-18",
    totalAmount: 750000,
    paidAmount: 225000,
    remainingTenure: "3 years 6 months",
  },
  {
    id: 3,
    name: "Personal Loan",
    bank: "ICICI Bank",
    emiAmount: 8500,
    dueDate: "2023-07-10",
    totalAmount: 300000,
    paidAmount: 150000,
    remainingTenure: "1 year 6 months",
  },
]

export function EMICard({ onTransaction }) {
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" })
  const { addTransaction } = useTransactionStore()

  const handlePayEMI = (loan) => {
    setSelectedLoan(loan)
    setIsPaymentModalOpen(true)
  }

  const handlePaymentSuccess = () => {
    // Add transaction to store
    if (selectedLoan) {
      addTransaction({
        name: `Paid ${selectedLoan.name} EMI`,
        amount: selectedLoan.emiAmount,
        type: "expense",
        category: "Loan EMI",
        status: "completed",
      })

      // Notify parent component
      if (onTransaction) {
        onTransaction({
          name: `Paid ${selectedLoan.name} EMI`,
          amount: selectedLoan.emiAmount,
          type: "expense",
          category: "Loan EMI",
          status: "completed",
        })
      }
    }

    setIsPaymentModalOpen(false)
    setSelectedLoan(null)
  }

  return (
    <>
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-blue-800 dark:text-blue-300">EMI Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loans.map((loan) => {
              const progressPercentage = (loan.paidAmount / loan.totalAmount) * 100

              return (
                <div key={loan.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{loan.name}</p>
                      <p className="text-xs text-muted-foreground">{loan.bank}</p>
                    </div>
                    <Button size="sm" onClick={() => handlePayEMI(loan)} className="bg-blue-600 hover:bg-blue-700">
                      Pay ₹{loan.emiAmount.toLocaleString("en-IN")}
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Due: {loan.dueDate}</span>
                      <span>{loan.remainingTenure} remaining</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Paid: ₹{loan.paidAmount.toLocaleString("en-IN")}</span>
                      <span>Total: ₹{loan.totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* EMI Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pay EMI</DialogTitle>
          </DialogHeader>
          {selectedLoan && (
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">{selectedLoan.name}</p>
                <p className="text-xs text-muted-foreground">{selectedLoan.bank}</p>
                <p className="text-lg font-bold">₹{selectedLoan.emiAmount.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground">Due Date: {selectedLoan.dueDate}</p>
              </div>

              <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="upi">UPI</TabsTrigger>
                </TabsList>
                <TabsContent value="card">
                  <CardPayment cardDetails={cardDetails} setCardDetails={setCardDetails} />
                </TabsContent>
                <TabsContent value="upi">
                  <UPIPayment amount={selectedLoan.emiAmount} />
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentSuccess}>Pay Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
