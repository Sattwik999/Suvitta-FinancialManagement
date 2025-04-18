"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Receipt, Plus, Search, Calendar, Trash2, Edit, AlertCircle } from "lucide-react"
import { useTransactionStore } from "@/store/transaction-store"

const initialSubscriptions = [
  {
    id: 1,
    name: "Netflix",
    category: "Entertainment",
    amount: 649,
    billingCycle: "Monthly",
    nextBillingDate: "2023-07-15",
    status: "Active",
    paymentMethod: "Credit Card",
    startDate: "2022-01-10",
  },
  {
    id: 2,
    name: "Amazon Prime",
    category: "Shopping",
    amount: 1499,
    billingCycle: "Yearly",
    nextBillingDate: "2023-08-10",
    status: "Active",
    paymentMethod: "Debit Card",
    startDate: "2021-08-10",
  },
  {
    id: 3,
    name: "Spotify",
    category: "Music",
    amount: 119,
    billingCycle: "Monthly",
    nextBillingDate: "2023-07-22",
    status: "Active",
    paymentMethod: "UPI",
    startDate: "2022-03-22",
  },
  {
    id: 4,
    name: "Hotstar",
    category: "Entertainment",
    amount: 299,
    billingCycle: "Monthly",
    nextBillingDate: "2023-07-05",
    status: "Due",
    paymentMethod: "Credit Card",
    startDate: "2022-02-05",
  },
  {
    id: 5,
    name: "YouTube Premium",
    category: "Entertainment",
    amount: 129,
    billingCycle: "Monthly",
    nextBillingDate: "2023-07-18",
    status: "Active",
    paymentMethod: "UPI",
    startDate: "2022-04-18",
  },
  {
    id: 6,
    name: "Gym Membership",
    category: "Health",
    amount: 1200,
    billingCycle: "Monthly",
    nextBillingDate: "2023-07-01",
    status: "Due",
    paymentMethod: "Bank Transfer",
    startDate: "2022-01-01",
  },
  {
    id: 7,
    name: "Microsoft 365",
    category: "Productivity",
    amount: 5999,
    billingCycle: "Yearly",
    nextBillingDate: "2023-12-15",
    status: "Active",
    paymentMethod: "Credit Card",
    startDate: "2021-12-15",
  },
]

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isPayModalOpen, setIsPayModalOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [newSubscription, setNewSubscription] = useState({
    name: "",
    category: "",
    amount: "",
    billingCycle: "Monthly",
    nextBillingDate: "",
    paymentMethod: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const { addTransaction } = useTransactionStore()

  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      (searchTerm === "" || sub.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === "all" || sub.category === filterCategory),
  )

  const handleAddSubscription = () => {
    const newSub = {
      id: subscriptions.length + 1,
      ...newSubscription,
      status: "Active",
      startDate: new Date().toISOString().split("T")[0],
    }
    setSubscriptions([...subscriptions, newSub])
    setIsAddModalOpen(false)
    setNewSubscription({
      name: "",
      category: "",
      amount: "",
      billingCycle: "Monthly",
      nextBillingDate: "",
      paymentMethod: "",
    })
  }

  const handlePaySubscription = () => {
    if (selectedSubscription) {
      // Update subscription status
      setSubscriptions(
        subscriptions.map((sub) => (sub.id === selectedSubscription.id ? { ...sub, status: "Active" } : sub)),
      )

      // Add transaction
      addTransaction({
        name: `Paid ${selectedSubscription.name} Subscription`,
        amount: selectedSubscription.amount,
        type: "expense",
        category: "Subscription",
        status: "completed",
      })

      setIsPayModalOpen(false)
      setSelectedSubscription(null)
    }
  }

  const handleDeleteSubscription = (id) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id))
  }

  const getTotalMonthlyExpense = () => {
    return (
      subscriptions.filter((sub) => sub.billingCycle === "Monthly").reduce((total, sub) => total + sub.amount, 0) +
      subscriptions.filter((sub) => sub.billingCycle === "Yearly").reduce((total, sub) => total + sub.amount / 12, 0)
    )
  }

  const getTotalYearlyExpense = () => {
    return (
      subscriptions.filter((sub) => sub.billingCycle === "Monthly").reduce((total, sub) => total + sub.amount * 12, 0) +
      subscriptions.filter((sub) => sub.billingCycle === "Yearly").reduce((total, sub) => total + sub.amount, 0)
    )
  }

  const categories = ["Entertainment", "Shopping", "Music", "Health", "Productivity", "Utilities", "Other"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">Subscriptions</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Subscription
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expense</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{getTotalMonthlyExpense().toLocaleString("en-IN")}</div>
            <p className="text-xs text-muted-foreground">Total monthly subscription cost</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yearly Expense</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{getTotalYearlyExpense().toLocaleString("en-IN")}</div>
            <p className="text-xs text-muted-foreground">Total yearly subscription cost</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              {subscriptions.filter((sub) => sub.status === "Due").length} payment(s) due
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search subscriptions..."
                  className="w-full md:w-[250px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Billing Cycle</TableHead>
                  <TableHead>Next Billing</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">{subscription.name}</TableCell>
                    <TableCell>{subscription.category}</TableCell>
                    <TableCell>₹{subscription.amount.toLocaleString("en-IN")}</TableCell>
                    <TableCell>{subscription.billingCycle}</TableCell>
                    <TableCell>{subscription.nextBillingDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          subscription.status === "Due"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }
                      >
                        {subscription.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {subscription.status === "Due" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedSubscription(subscription)
                              setIsPayModalOpen(true)
                            }}
                          >
                            <Receipt className="h-4 w-4" />
                            <span className="sr-only">Pay</span>
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDeleteSubscription(subscription.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Subscription Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Subscription</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Subscription Name</Label>
              <Input
                id="name"
                value={newSubscription.name}
                onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newSubscription.category}
                onValueChange={(value) => setNewSubscription({ ...newSubscription, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={newSubscription.amount}
                onChange={(e) => setNewSubscription({ ...newSubscription, amount: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="billingCycle">Billing Cycle</Label>
              <Select
                value={newSubscription.billingCycle}
                onValueChange={(value) => setNewSubscription({ ...newSubscription, billingCycle: value })}
              >
                <SelectTrigger id="billingCycle">
                  <SelectValue placeholder="Select billing cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nextBillingDate">Next Billing Date</Label>
              <Input
                id="nextBillingDate"
                type="date"
                value={newSubscription.nextBillingDate}
                onChange={(e) => setNewSubscription({ ...newSubscription, nextBillingDate: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={newSubscription.paymentMethod}
                onValueChange={(value) => setNewSubscription({ ...newSubscription, paymentMethod: value })}
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubscription}>Add Subscription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pay Subscription Modal */}
      <Dialog open={isPayModalOpen} onOpenChange={setIsPayModalOpen}>
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
                <p className="text-xs text-muted-foreground">Due Date: {selectedSubscription.nextBillingDate}</p>
              </div>

              <Tabs defaultValue="card">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="upi">UPI</TabsTrigger>
                </TabsList>
                <TabsContent value="card">
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="upi">
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@upi" />
                    </div>
                    <div className="flex justify-center">
                      <div className="border p-4 rounded-md">
                        <p className="text-center mb-2">Scan QR Code</p>
                        <div className="h-40 w-40 bg-gray-200 flex items-center justify-center">
                          <AlertCircle className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPayModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaySubscription} className="bg-pink-600 hover:bg-pink-700">
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
