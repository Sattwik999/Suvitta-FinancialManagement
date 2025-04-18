"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UPIPayment } from "./upi-payment"
import { CardPayment } from "./card-payment"

const steps = ["Amount", "Payment Method", "OTP Verification", "Confirmation"]

export function AddMoneyModal({ isOpen, onClose, onAddMoney, accounts }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [amount, setAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" })
  const [otp, setOtp] = useState("")

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onAddMoney(Number.parseFloat(amount), selectedAccount)
      onClose()
      resetForm()
    }
  }

  const resetForm = () => {
    setCurrentStep(0)
    setAmount("")
    setSelectedAccount("")
    setPaymentMethod("card")
    setCardDetails({ number: "", expiry: "", cvv: "" })
    setOtp("")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account">Select Account</Label>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger id="account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.name} value={account.name}>
                      {account.name} ({account.bankName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Add</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card">Card</TabsTrigger>
                <TabsTrigger value="upi">UPI</TabsTrigger>
              </TabsList>
              <TabsContent value="card">
                <CardPayment cardDetails={cardDetails} setCardDetails={setCardDetails} />
              </TabsContent>
              <TabsContent value="upi">
                <UPIPayment amount={amount} />
              </TabsContent>
            </Tabs>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Enter the OTP sent to your registered mobile number</p>
            <Input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
        )
      case 3:
        return (
          <div className="text-center space-y-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
            <p className="text-lg font-medium">Money Added Successfully</p>
            <p className="text-sm text-muted-foreground">
              ₹{Number(amount).toLocaleString("en-IN")} has been added to your {selectedAccount} account.
            </p>
          </div>
        )
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) resetForm()
        onClose()
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {renderStepContent()}
          <div className="flex justify-between">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              className="ml-auto"
              disabled={
                (currentStep === 0 && (!amount || !selectedAccount)) ||
                (currentStep === 1 &&
                  paymentMethod === "card" &&
                  (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) ||
                (currentStep === 2 && !otp)
              }
            >
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
