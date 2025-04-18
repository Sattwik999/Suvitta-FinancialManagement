"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UPIPayment } from "./upi-payment"
import { CardPayment } from "./card-payment"

const steps = ["Amount and Account", "Recipient", "Payment Method", "Confirmation"]

export function SendMoneyModal({ isOpen, onClose, onSendMoney, accounts }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [amount, setAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [recipientAccount, setRecipientAccount] = useState("")
  const [recipientBank, setRecipientBank] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("bank")
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" })
  const [otp, setOtp] = useState("")

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onSendMoney(Number.parseFloat(amount), selectedAccount, recipient)
      onClose()
      resetForm()
    }
  }

  const resetForm = () => {
    setCurrentStep(0)
    setAmount("")
    setSelectedAccount("")
    setRecipient("")
    setRecipientAccount("")
    setRecipientBank("")
    setPaymentMethod("bank")
    setCardDetails({ number: "", expiry: "", cvv: "" })
    setOtp("")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Send</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account">From Account</Label>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger id="account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.name} value={account.name}>
                      {account.name} ({account.bankName}) - ₹{account.balance.toLocaleString("en-IN")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Name</Label>
              <Input
                id="recipient"
                placeholder="Enter recipient name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipientAccount">Recipient Account Number</Label>
              <Input
                id="recipientAccount"
                placeholder="Enter account number"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipientBank">Recipient Bank</Label>
              <Select value={recipientBank} onValueChange={setRecipientBank}>
                <SelectTrigger id="recipientBank">
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hdfc">HDFC Bank</SelectItem>
                  <SelectItem value="sbi">State Bank of India</SelectItem>
                  <SelectItem value="icici">ICICI Bank</SelectItem>
                  <SelectItem value="axis">Axis Bank</SelectItem>
                  <SelectItem value="pnb">Punjab National Bank</SelectItem>
                  <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <Tabs defaultValue="bank" onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                <TabsTrigger value="upi">UPI</TabsTrigger>
                <TabsTrigger value="card">Card</TabsTrigger>
              </TabsList>
              <TabsContent value="bank">
                <div className="space-y-4 py-4">
                  <p className="text-sm">
                    You are about to transfer ₹{Number(amount).toLocaleString("en-IN")} to {recipient} ({recipientBank})
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      placeholder="Enter OTP sent to your mobile"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="upi">
                <UPIPayment amount={amount} />
              </TabsContent>
              <TabsContent value="card">
                <CardPayment cardDetails={cardDetails} setCardDetails={setCardDetails} />
              </TabsContent>
            </Tabs>
          </div>
        )
      case 3:
        return (
          <div className="text-center space-y-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
            <p className="text-lg font-medium">Money Sent Successfully</p>
            <p className="text-sm text-muted-foreground">
              ₹{Number(amount).toLocaleString("en-IN")} has been sent from your {selectedAccount} account to {recipient}
              .
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
                (currentStep === 1 && (!recipient || !recipientAccount || !recipientBank)) ||
                (currentStep === 2 && paymentMethod === "bank" && !otp)
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
