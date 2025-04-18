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

export function NewInvestmentButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [investmentType, setInvestmentType] = useState("stock")
  const [investmentDetails, setInvestmentDetails] = useState({
    symbol: "",
    shares: "",
    price: "",
    fundName: "",
    amount: "",
    bondType: "",
    maturity: "",
  })

  const handleSubmit = () => {
    // In a real app, you would process the investment here
    console.log("Investment details:", { ...investmentDetails, type: investmentType })
    setIsOpen(false)
    // Reset form
    setInvestmentDetails({
      symbol: "",
      shares: "",
      price: "",
      fundName: "",
      amount: "",
      bondType: "",
      maturity: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Investment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Make New Investment</DialogTitle>
          <DialogDescription>Fill in the details to make a new investment.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="stock" onValueChange={setInvestmentType} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stock">Stock</TabsTrigger>
            <TabsTrigger value="fund">Fund</TabsTrigger>
            <TabsTrigger value="bond">Bond</TabsTrigger>
          </TabsList>
          <TabsContent value="stock" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stock-symbol">Stock Symbol</Label>
                <Input
                  id="stock-symbol"
                  placeholder="e.g., AAPL"
                  value={investmentDetails.symbol}
                  onChange={(e) => setInvestmentDetails({ ...investmentDetails, symbol: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock-shares">Number of Shares</Label>
                <Input
                  id="stock-shares"
                  type="number"
                  placeholder="e.g., 10"
                  value={investmentDetails.shares}
                  onChange={(e) => setInvestmentDetails({ ...investmentDetails, shares: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock-price">Price per Share</Label>
                <Input
                  id="stock-price"
                  type="number"
                  placeholder="0.00"
                  value={investmentDetails.price}
                  onChange={(e) => setInvestmentDetails({ ...investmentDetails, price: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock-order-type">Order Type</Label>
                <Select defaultValue="market">
                  <SelectTrigger id="stock-order-type">
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                    <SelectItem value="stop">Stop Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="fund" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fund-name">Fund Name or Symbol</Label>
                <Input
                  id="fund-name"
                  placeholder="e.g., VTSAX"
                  value={investmentDetails.fundName}
                  onChange={(e) => setInvestmentDetails({ ...investmentDetails, fundName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fund-amount">Investment Amount</Label>
                <Input
                  id="fund-amount"
                  type="number"
                  placeholder="0.00"
                  value={investmentDetails.amount}
                  onChange={(e) => setInvestmentDetails({ ...investmentDetails, amount: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fund-type">Fund Type</Label>
                <Select defaultValue="index">
                  <SelectTrigger id="fund-type">
                    <SelectValue placeholder="Select fund type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="index">Index Fund</SelectItem>
                    <SelectItem value="mutual">Mutual Fund</SelectItem>
                    <SelectItem value="etf">ETF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="bond" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="bond-type">Bond Type</Label>
                <Select
                  value={investmentDetails.bondType}
                  onValueChange={(value) => setInvestmentDetails({ ...investmentDetails, bondType: value })}
                >
                  <SelectTrigger id="bond-type">
                    <SelectValue placeholder="Select bond type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="treasury">Treasury Bond</SelectItem>
                    <SelectItem value="corporate">Corporate Bond</SelectItem>
                    <SelectItem value="municipal">Municipal Bond</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bond-amount">Investment Amount</Label>
                <Input
                  id="bond-amount"
                  type="number"
                  placeholder="0.00"
                  value={investmentDetails.amount}
                  onChange={(e) => setInvestmentDetails({ ...investmentDetails, amount: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bond-maturity">Maturity</Label>
                <Select
                  value={investmentDetails.maturity}
                  onValueChange={(value) => setInvestmentDetails({ ...investmentDetails, maturity: value })}
                >
                  <SelectTrigger id="bond-maturity">
                    <SelectValue placeholder="Select maturity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short-term (1-3 years)</SelectItem>
                    <SelectItem value="medium">Medium-term (3-10 years)</SelectItem>
                    <SelectItem value="long">Long-term (10+ years)</SelectItem>
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
          <Button onClick={handleSubmit}>Make Investment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
