"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UPIPayment } from "../upi-payment"
import { CardPayment } from "../card-payment"
import { useTransactionStore } from "@/store/transaction-store"

const insurances = [
  {
    id: 1,
    name: "LIC Jeevan Anand",
    type: "Life Insurance",
    provider: "LIC of India",
    premiumAmount: 25000,
    dueDate: "2023-07-30",
    policyNumber: "LIC123456789",
    status: "Due",
  },
  {
    id: 2,
    name: "Health Insurance",
    type: "Health Insurance",
    provider: "Star Health",
    premiumAmount: 18500,
    dueDate: "2023-08-15",
    policyNumber: "STAR987654321",
    status: "Due",
  },
  {
    id: 3,
    name: "Car Insurance",
    type: "Vehicle Insurance",
    provider: "ICICI Lombard",
    premiumAmount: 8200,
    dueDate: "2023-09-05",
    policyNumber: "ICICI567890123",
    status: "Upcoming",
  },
]

export function InsuranceCard({ onTransaction }) {
  const [selectedInsurance, setSelectedInsurance] = useState(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" })
  const { addTransaction } = useTransactionStore()

  const handlePayPremium = (insurance) => {
    setSelectedInsurance(insurance)
    setIsPaymentModalOpen(true)
  }

  const handlePaymentSuccess = () => {
    // Add transaction to store
    if (selectedInsurance) {
      addTransaction({
        name: `Paid ${selectedInsurance.name} Premium`,
        amount: selectedInsurance.premiumAmount,
        type: "expense",
        category: "Insurance",
        status: "completed",
      })

      // Notify parent component
      if (onTransaction) {
        onTransaction({
          name: `Paid ${selectedInsurance.name} Premium`,
          amount: selectedInsurance.premiumAmount,
          type: "expense",
          category: "Insurance",
          status: "completed",
        })
      }
    }

    setIsPaymentModalOpen(false)
    setSelectedInsurance(null)
  }

  return (
    <>
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-green-800 dark:text-green-300 flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Insurance Policies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insurances.map((insurance) => (
              <div key={insurance.id} className="p-3 border rounded-md bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{insurance.name}</p>
                    <p className="text-xs text-muted-foreground">{insurance.provider}</p>
                    <p className="text-xs text-muted-foreground">Policy: {insurance.policyNumber}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div
                      className={`text-xs px-2 py-0.5 rounded-full mb-2 ${
                        insurance.status === "Due"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {insurance.status}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handlePayPremium(insurance)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Pay ₹{insurance.premiumAmount.toLocaleString("en-IN")}
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Due: {insurance.dueDate}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insurance Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pay Insurance Premium</DialogTitle>
          </DialogHeader>
          {selectedInsurance && (
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">{selectedInsurance.name}</p>
                <p className="text-xs text-muted-foreground">{selectedInsurance.provider}</p>
                <p className="text-xs text-muted-foreground">Policy: {selectedInsurance.policyNumber}</p>
                <p className="text-lg font-bold">₹{selectedInsurance.premiumAmount.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground">Due Date: {selectedInsurance.dueDate}</p>
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
                  <UPIPayment amount={selectedInsurance.premiumAmount} />
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentSuccess} className="bg-green-600 hover:bg-green-700">
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
