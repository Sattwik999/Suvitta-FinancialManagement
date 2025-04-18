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
import { Calendar, Plus, Search, CreditCard, Trash2, Edit, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useTransactionStore } from "@/store/transaction-store"

const initialLoans = [
  {
    id: 1,
    name: "Home Loan",
    bank: "HDFC Bank",
    emiAmount: 35000,
    dueDate: "2023-07-25",
    totalAmount: 4500000,
    paidAmount: 1200000,
    remainingTenure: "15 years 3 months",
    interestRate: 8.5,
    status: "Active",
  },
  {
    id: 2,
    name: "Car Loan",
    bank: "SBI",
    emiAmount: 12500,
    dueDate: "2023-07-18",
    totalAmount: 750000,
    paidAmount: 225000,
    remainingTenure: "3 years 6 months",
    interestRate: 9.2,
    status: "Active",
  },
  {
    id: 3,
    name: "Personal Loan",
    bank: "ICICI Bank",
    emiAmount: 8500,
    dueDate: "2023-07-10",
    totalAmount: 300000,
    paidAmount: 150000,
    remainingTenure: "1 year 6 months",
    interestRate: 12.5,
    status: "Due",
  },
  {
    id: 4,
    name: "Education Loan",
    bank: "Axis Bank",
    emiAmount: 15000,
    dueDate: "2023-07-05",
    totalAmount: 1200000,
    paidAmount: 360000,
    remainingTenure: "4 years 8 months",
    interestRate: 7.8,
    status: "Due",
  },
]

export default function EMIsPage() {
  const [loans, setLoans] = useState(initialLoans)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isPayModalOpen, setIsPayModalOpen] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [newLoan, setNewLoan] = useState({
    name: "",
    bank: "",
    emiAmount: "",
    totalAmount: "",
    interestRate: "",
    remainingTenure: "",
    dueDate: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBank, setFilterBank] = useState("all")
  const { addTransaction } = useTransactionStore()

  const filteredLoans = loans.filter(
    (loan) =>
      (searchTerm === "" || loan.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterBank === "all" || loan.bank === filterBank),
  )

  const handleAddLoan = () => {
    const newLoanEntry = {
      id: loans.length + 1,
      ...newLoan,
      paidAmount: 0,
      status: "Active",
    }
    setLoans([...loans, newLoanEntry])
    setIsAddModalOpen(false)
    setNewLoan({
      name: "",
      bank: "",
      emiAmount: "",
      totalAmount: "",
      interestRate: "",
      remainingTenure: "",
      dueDate: "",
    })
  }

  const handlePayEMI = () => {
    if (selectedLoan) {
      // Update loan status
      setLoans(
        loans.map((loan) =>
          loan.id === selectedLoan.id
            ? {
                ...loan,
                status: "Active",
                paidAmount: loan.paidAmount + loan.emiAmount,
              }
            : loan,
        ),
      )

      // Add transaction
      addTransaction({
        name: `Paid ${selectedLoan.name} EMI`,
        amount: selectedLoan.emiAmount,
        type: "expense",
        category: "Loan EMI",
        status: "completed",
      })

      setIsPayModalOpen(false)
      setSelectedLoan(null)
    }
  }

  const handleDeleteLoan = (id) => {
    setLoans(loans.filter((loan) => loan.id !== id))
  }

  const getTotalMonthlyEMI = () => {
    return loans.reduce((total, loan) => total + loan.emiAmount, 0)
  }

  const getTotalOutstandingAmount = () => {
    return loans.reduce((total, loan) => total + (loan.totalAmount - loan.paidAmount), 0)
  }

  const banks = ["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">EMI Management</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Loan
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly EMI</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{getTotalMonthlyEMI().toLocaleString("en-IN")}</div>
            <p className="text-xs text-muted-foreground">Total monthly EMI payments</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{getTotalOutstandingAmount().toLocaleString("en-IN")}</div>
            <p className="text-xs text-muted-foreground">Total outstanding loan amount</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loans.length}</div>
            <p className="text-xs text-muted-foreground">
              {loans.filter((loan) => loan.status === "Due").length} payment(s) due
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search loans..."
                  className="w-full md:w-[250px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterBank} onValueChange={setFilterBank}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Banks</SelectItem>
                  {banks.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
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
                  <TableHead>Loan Name</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>EMI Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoans.map((loan) => {
                  const progressPercentage = (loan.paidAmount / loan.totalAmount) * 100

                  return (
                    <TableRow key={loan.id}>
                      <TableCell className="font-medium">{loan.name}</TableCell>
                      <TableCell>{loan.bank}</TableCell>
                      <TableCell>₹{loan.emiAmount.toLocaleString("en-IN")}</TableCell>
                      <TableCell>{loan.dueDate}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={progressPercentage} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{progressPercentage.toFixed(0)}%</span>
                            <span>{loan.remainingTenure} left</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            loan.status === "Due"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          }
                        >
                          {loan.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {loan.status === "Due" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setSelectedLoan(loan)
                                setIsPayModalOpen(true)
                              }}
                            >
                              <CreditCard className="h-4 w-4" />
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
                            onClick={() => handleDeleteLoan(loan.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Loan Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Loan</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Loan Name</Label>
              <Input
                id="name"
                value={newLoan.name}
                onChange={(e) => setNewLoan({ ...newLoan, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bank">Bank</Label>
              <Select value={newLoan.bank} onValueChange={(value) => setNewLoan({ ...newLoan, bank: value })}>
                <SelectTrigger id="bank">
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emiAmount">EMI Amount (₹)</Label>
              <Input
                id="emiAmount"
                type="number"
                value={newLoan.emiAmount}
                onChange={(e) => setNewLoan({ ...newLoan, emiAmount: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalAmount">Total Loan Amount (₹)</Label>
              <Input
                id="totalAmount"
                type="number"
                value={newLoan.totalAmount}
                onChange={(e) => setNewLoan({ ...newLoan, totalAmount: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={newLoan.interestRate}
                onChange={(e) => setNewLoan({ ...newLoan, interestRate: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="remainingTenure">Remaining Tenure</Label>
              <Input
                id="remainingTenure"
                value={newLoan.remainingTenure}
                onChange={(e) => setNewLoan({ ...newLoan, remainingTenure: e.target.value })}
                placeholder="e.g., 5 years 6 months"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Next Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={newLoan.dueDate}
                onChange={(e) => setNewLoan({ ...newLoan, dueDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLoan}>Add Loan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pay EMI Modal */}
      <Dialog open={isPayModalOpen} onOpenChange={setIsPayModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pay EMI</DialogTitle>
          </DialogHeader>
          {selectedLoan && (
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">{selectedLoan.name}</p>
                <p className="text-xs text-muted-foreground">{selectedLoan.bank}</p>
                <p className="text-lg font-bold">₹{selectedLoan.emiAmount.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground">Due Date: {selectedLoan.dueDate}</p>
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
            <Button onClick={handlePayEMI} className="bg-blue-600 hover:bg-blue-700">
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
