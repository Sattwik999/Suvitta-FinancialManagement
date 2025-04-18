"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export function TransactionFilters() {
  const [amountRange, setAmountRange] = useState([0, 5000])

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Transaction Type</h3>
        <RadioGroup defaultValue="all">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="type-all" />
            <Label htmlFor="type-all">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="income" id="type-income" />
            <Label htmlFor="type-income">Income</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expense" id="type-expense" />
            <Label htmlFor="type-expense">Expense</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Status</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="status-completed" defaultChecked />
            <Label htmlFor="status-completed">Completed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="status-pending" defaultChecked />
            <Label htmlFor="status-pending">Pending</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="status-failed" defaultChecked />
            <Label htmlFor="status-failed">Failed</Label>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="category-shopping" defaultChecked />
            <Label htmlFor="category-shopping">Shopping</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-groceries" defaultChecked />
            <Label htmlFor="category-groceries">Groceries</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-entertainment" defaultChecked />
            <Label htmlFor="category-entertainment">Entertainment</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-transportation" defaultChecked />
            <Label htmlFor="category-transportation">Transportation</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-salary" defaultChecked />
            <Label htmlFor="category-salary">Salary</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-investment" defaultChecked />
            <Label htmlFor="category-investment">Investment</Label>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Amount Range</h3>
          <span className="text-xs text-muted-foreground">
          ₹{amountRange[0]} - ₹{amountRange[1]}
          </span>
        </div>
        <Slider defaultValue={[0, 5000]} max={5000} step={100} onValueChange={setAmountRange} className="py-4" />
      </div>

      <Button className="w-full">Apply Filters</Button>
      <Button variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  )
}
