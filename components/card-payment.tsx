"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CardPayment({ cardDetails, setCardDetails }) {
  const savedCards = [
    { id: "card1", name: "HDFC Debit Card", number: "•••• •••• •••• 4242", expiry: "12/25" },
    { id: "card2", name: "SBI Credit Card", number: "•••• •••• •••• 5555", expiry: "08/26" },
  ]

  const [selectedSavedCard, setSelectedSavedCard] = useState("")
  const [useNewCard, setUseNewCard] = useState(false)

  const handleSavedCardSelect = (cardId) => {
    setSelectedSavedCard(cardId)
    setUseNewCard(false)
  }

  return (
    <div className="space-y-4 py-4">
      {savedCards.length > 0 && (
        <div className="space-y-2">
          <Label>Saved Cards</Label>
          <div className="space-y-2">
            {savedCards.map((card) => (
              <div
                key={card.id}
                className={`p-3 border rounded-md cursor-pointer flex justify-between items-center ${
                  selectedSavedCard === card.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => handleSavedCardSelect(card.id)}
              >
                <div>
                  <p className="font-medium">{card.name}</p>
                  <p className="text-sm text-muted-foreground">{card.number}</p>
                </div>
                <p className="text-sm">Expires: {card.expiry}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center">
        <div className="h-px flex-1 bg-border"></div>
        <p className="text-xs text-muted-foreground px-2">OR</p>
        <div className="h-px flex-1 bg-border"></div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={cardDetails.number}
          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            type="password"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
