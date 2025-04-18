"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Plus, Trash2 } from "lucide-react"
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

const initialPaymentMethods = [
  {
    id: "card-1",
    type: "Visa",
    last4: "4242",
    expiry: "04/25",
    isDefault: true,
  },
  {
    id: "card-2",
    type: "Mastercard",
    last4: "5555",
    expiry: "08/24",
    isDefault: false,
  },
  {
    id: "card-3",
    type: "American Express",
    last4: "1234",
    expiry: "12/26",
    isDefault: false,
  },
]

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })

  const handleAddCard = () => {
    // In a real app, you would validate and process the card
    const last4 = newCard.cardNumber.slice(-4)
    const type = getCardType(newCard.cardNumber)
    const expiry = newCard.expiryDate

    setPaymentMethods([
      ...paymentMethods,
      {
        id: `card-${paymentMethods.length + 1}`,
        type,
        last4,
        expiry,
        isDefault: false,
      },
    ])

    setNewCard({
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    })

    setIsAddingCard(false)
  }

  const handleSetDefault = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const handleRemoveCard = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  // Simple function to determine card type based on first digit
  const getCardType = (cardNumber) => {
    const firstDigit = cardNumber.charAt(0)
    if (firstDigit === "4") return "Visa"
    if (firstDigit === "5") return "Mastercard"
    if (firstDigit === "3") return "American Express"
    return "Card"
  }

  return (
    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <Card key={method.id} className={method.isDefault ? "border-primary" : ""}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5" />
                <div>
                  <p className="font-medium">
                    {method.type} •••• {method.last4}
                  </p>
                  <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.isDefault ? (
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Default
                  </Badge>
                ) : (
                  <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => handleSetDefault(method.id)}>
                    Set Default
                  </Button>
                )}
                {!method.isDefault && (
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleRemoveCard(method.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Add a new credit or debit card to your account.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={newCard.cardNumber}
                onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={newCard.cardholderName}
                onChange={(e) => setNewCard({ ...newCard, cardholderName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={newCard.expiryDate}
                  onChange={(e) => setNewCard({ ...newCard, expiryDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={newCard.cvv}
                  onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingCard(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCard}>Add Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
