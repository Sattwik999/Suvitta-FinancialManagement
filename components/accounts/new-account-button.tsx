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

export function NewAccountButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [accountType, setAccountType] = useState("checking")
  const [accountDetails, setAccountDetails] = useState({
    name: "",
    initialDeposit: "",
  })

  const handleSubmit = () => {
    // In a real app, you would process the account creation here
    console.log("Account details:", { ...accountDetails, type: accountType })
    setIsOpen(false)
    // Reset form
    setAccountDetails({
      name: "",
      initialDeposit: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Open New Account</DialogTitle>
          <DialogDescription>Fill in the details to open a new account.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="checking" onValueChange={setAccountType} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="checking">Checking</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
          </TabsList>
          <TabsContent value="checking" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="checking-name">Account Name</Label>
                <Input
                  id="checking-name"
                  placeholder="e.g., Primary Checking"
                  value={accountDetails.name}
                  onChange={(e) => setAccountDetails({ ...accountDetails, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="checking-deposit">Initial Deposit</Label>
                <Input
                  id="checking-deposit"
                  type="number"
                  placeholder="0.00"
                  value={accountDetails.initialDeposit}
                  onChange={(e) => setAccountDetails({ ...accountDetails, initialDeposit: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="checking-features">Account Features</Label>
                <Select defaultValue="standard">
                  <SelectTrigger id="checking-features">
                    <SelectValue placeholder="Select features" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Checking</SelectItem>
                    <SelectItem value="premium">Premium Checking</SelectItem>
                    <SelectItem value="student">Student Checking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="savings" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="savings-name">Account Name</Label>
                <Input
                  id="savings-name"
                  placeholder="e.g., Emergency Fund"
                  value={accountDetails.name}
                  onChange={(e) => setAccountDetails({ ...accountDetails, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="savings-deposit">Initial Deposit</Label>
                <Input
                  id="savings-deposit"
                  type="number"
                  placeholder="0.00"
                  value={accountDetails.initialDeposit}
                  onChange={(e) => setAccountDetails({ ...accountDetails, initialDeposit: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="savings-type">Savings Type</Label>
                <Select defaultValue="high-yield">
                  <SelectTrigger id="savings-type">
                    <SelectValue placeholder="Select savings type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Savings</SelectItem>
                    <SelectItem value="high-yield">High-Yield Savings</SelectItem>
                    <SelectItem value="money-market">Money Market</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="investment" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="investment-name">Account Name</Label>
                <Input
                  id="investment-name"
                  placeholder="e.g., Retirement Portfolio"
                  value={accountDetails.name}
                  onChange={(e) => setAccountDetails({ ...accountDetails, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="investment-deposit">Initial Investment</Label>
                <Input
                  id="investment-deposit"
                  type="number"
                  placeholder="0.00"
                  value={accountDetails.initialDeposit}
                  onChange={(e) => setAccountDetails({ ...accountDetails, initialDeposit: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="investment-strategy">Investment Strategy</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger id="investment-strategy">
                    <SelectValue placeholder="Select investment strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
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
          <Button onClick={handleSubmit}>Open Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
