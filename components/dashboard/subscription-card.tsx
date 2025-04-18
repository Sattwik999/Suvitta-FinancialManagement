"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Receipt, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UPIPayment } from "../upi-payment"
import { CardPayment } from "../card-payment"
import { useTransactionStore } from "@/store/transaction-store"
import { Badge } from "@/components/ui/badge"

const subscriptions = [
  {
    id: 1,
    name: "Netflix",
    category: "Entertainment",
    amount: 649,
    billingCycle: "Monthly",
    nextBillingDate: "2023-07-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Amazon Prime",
    category: "Shopping",
    amount: 1499,
    billingCycle: "Yearly",
    nextBillingDate: "2023-08-10",
    status: "Active",
  },
  {
    id: 3,
    name: "Spotify",
    category: "Music",
    amount: 119,
    billingCycle: "Monthly",
    nextBillingDate: "2023-07-22",
    status: "Active",
  },
  {
    id: 4,
    name: "Hotstar",
    category: "Entertainment",
    amount: 299,
    billingCycle: "Monthly",
    nextBillingDate: "2023-07-05",
    status: "Due",
  },
]

export function SubscriptionCard({ onTransaction }) {
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" })
  const { addTransaction } = useTransactionStore()

  const handlePaySubscription = (subscription) => {
    setSelectedSubscription(subscription)
    setIsPaymentModalOpen(true)
  }

  const handlePaymentSuccess = () => {
    // Add transaction to store
    if (selectedSubscription) {
      addTransaction({
        name: `Paid ${selectedSubscription.name} Subscription`,
        amount: selectedSubscription.amount,
        type: "expense",
        category: "Subscription",
        status: "completed",
      })

      // Notify parent component
      if (onTransaction) {
        onTransaction({
          name: `Paid ${selectedSubscription.name} Subscription`,
          amount: selectedSubscription.amount,
          type: "expense",
          category: "Subscription",
          status: "completed",
        })
      }
    }

    setIsPaymentModalOpen(false)
    setSelectedSubscription(null)
  }

  const getTotalMonthlyExpense = () => {
    return (
      subscriptions.filter((sub) => sub.billingCycle === "Monthly").reduce((total, sub) => total + sub.amount, 0) +
      subscriptions.filter((sub) => sub.billingCycle === "Yearly").reduce((total, sub) => total + sub.amount / 12, 0)
    )
  }

  return (
    <>
      <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-pink-800 dark:text-pink-300 flex items-center">
            <Receipt className="mr-2 h-5 w-5" />
            Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-2xl font-bold">₹{getTotalMonthlyExpense().toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground">Monthly subscription expense</p>
          </div>

          <div className="space-y-3">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="p-3 border rounded-md bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{subscription.name}</p>
                    <p className="text-xs text-muted-foreground">{subscription.category}</p>
                    <p className="text-xs text-muted-foreground">{subscription.billingCycle}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge
                      variant="outline"
                      className={`mb-2 ${
                        subscription.status === "Due"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {subscription.status}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => handlePaySubscription(subscription)}
                      className="bg-pink-600 hover:bg-pink-700"
                      disabled={subscription.status !== "Due"}
                    >
                      ₹{subscription.amount.toLocaleString("en-IN")}
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Next billing: {subscription.nextBillingDate}
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4" asChild>
            <a href="/subscriptions">Manage Subscriptions</a>
          </Button>
        </CardContent>
      </Card>

      {/* Subscription Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pay Subscription</DialogTitle>
          </DialogHeader>
          {selectedSubscription && (
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">{selectedSubscription.name}</p>
                <p className="text-xs text-muted-foreground">{selectedSubscription.category}</p>
                <p className="text-lg font-bold">₹{selectedSubscription.amount.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground">Billing Cycle: {selectedSubscription.billingCycle}</p>
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
                  <UPIPayment amount={selectedSubscription.amount} />
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentSuccess} className="bg-pink-600 hover:bg-pink-700">
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
