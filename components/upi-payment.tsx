"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function UPIPayment({ amount }) {
  const [upiId, setUpiId] = useState("")

  // Generate a fake UPI QR code URL
  const qrCodeUrl = `/placeholder.svg?height=200&width=200&text=UPI-${amount}`

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="upi-id">UPI ID</Label>
        <Input id="upi-id" placeholder="yourname@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Or scan QR code to pay</p>
        <div className="flex justify-center">
          <div className="border p-4 rounded-md inline-block">
            <img src={qrCodeUrl || "/placeholder.svg"} alt="UPI QR Code" className="h-40 w-40" />
          </div>
        </div>
        <p className="text-sm font-medium">Amount: ₹{Number(amount).toLocaleString("en-IN")}</p>
      </div>
    </div>
  )
}
