"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NewPaymentButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [paymentType, setPaymentType] = useState("one-time")
  const [paymentDetails, setPaymentDetails] = useState({
    recipient: "",
    amount: "",
    date: "",
    category: "",
    recurrence: "one-time",
    paymentMethod: "",
  })

  const handleSubmit = () => {
    // In a real app, you would process the payment here
    console.log("Payment details:", paymentDetails)
    setIsOpen(false)
    // Reset form
    setPaymentDetails({
      recipient: "",
      amount: "",
      date: "",
      category: "",
      recurrence: "one-time",
      paymentMethod: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Payment</DialogTitle>
          <DialogDescription>Fill in the details to create a new payment.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="one-time" onValueChange={setPaymentType} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="one-time">One-Time Payment</TabsTrigger>
            <TabsTrigger value="recurring">Recurring Payment</TabsTrigger>
          </TabsList>
          <TabsContent value="one-time" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                  id="recipient"
                  placeholder="Enter recipient name"
                  value={paymentDetails.recipient}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, recipient: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={paymentDetails.amount}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Payment Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={paymentDetails.date}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={paymentDetails.category}
                  onValueChange={(value) => setPaymentDetails({ ...paymentDetails, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={paymentDetails.paymentMethod}
                  onValueChange={(value) => setPaymentDetails({ ...paymentDetails, paymentMethod: value })}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card-1">Visa •••• 4242</SelectItem>
                    <SelectItem value="card-2">Mastercard •••• 5555</SelectItem>
                    <SelectItem value="card-3">American Express •••• 1234</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="recurring" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="recipient-recurring">Recipient</Label>
                <Input
                  id="recipient-recurring"
                  placeholder="Enter recipient name"
                  value={paymentDetails.recipient}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, recipient: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount-recurring">Amount</Label>
                <Input
                  id="amount-recurring"
                  type="number"
                  placeholder="0.00"
                  value={paymentDetails.amount}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date-recurring">First Payment Date</Label>
                <Input
                  id="date-recurring"
                  type="date"
                  value={paymentDetails.date}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="recurrence">Recurrence</Label>
                <Select
                  value={paymentDetails.recurrence}
                  onValueChange={(value) => setPaymentDetails({ ...paymentDetails, recurrence: value })}
                >
                  <SelectTrigger id="recurrence">
                    <SelectValue placeholder="Select recurrence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category-recurring">Category</Label>
                <Select
                  value={paymentDetails.category}
                  onValueChange={(value) => setPaymentDetails({ ...paymentDetails, category: value })}
                >
                  <SelectTrigger id="category-recurring">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paymentMethod-recurring">Payment Method</Label>
                <Select
                  value={paymentDetails.paymentMethod}
                  onValueChange={(value) => setPaymentDetails({ ...paymentDetails, paymentMethod: value })}
                >
                  <SelectTrigger id="paymentMethod-recurring">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card-1">Visa •••• 4242</SelectItem>
                    <SelectItem value="card-2">Mastercard •••• 5555</SelectItem>
                    <SelectItem value="card-3">American Express •••• 1234</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
