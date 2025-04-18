"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Plus, Send, CreditCard, MoreHorizontal } from "lucide-react"
import { AddMoneyModal } from "./add-money-modal"
import { SendMoneyModal } from "./send-money-modal"
import { RequestMoneyModal } from "./request-money-modal"
import { useTransactionStore } from "@/store/transaction-store"

const initialAccounts = [
  { name: "Checking", bankName: "HDFC Bank", balance: 75000 },
  { name: "Savings", bankName: "SBI", balance: 560000 },
  { name: "Investment", bankName: "ICICI Bank", balance: 5879000 },
]

export function AccountsOverview({ onTransaction }) {
  const [accounts, setAccounts] = useState(initialAccounts)
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false)
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState(false)
  const [isRequestMoneyModalOpen, setIsRequestMoneyModalOpen] = useState(false)
  const { addTransaction } = useTransactionStore()

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  const handleAddMoney = (amount, account) => {
    setAccounts(accounts.map((acc) => (acc.name === account ? { ...acc, balance: acc.balance + amount } : acc)))

    // Add transaction to store
    addTransaction({
      name: `Deposit to ${account}`,
      amount: amount,
      type: "income",
      category: "Deposit",
      status: "completed",
    })

    // Notify parent component
    if (onTransaction) {
      onTransaction({
        name: `Deposit to ${account}`,
        amount: amount,
        type: "income",
        category: "Deposit",
        status: "completed",
      })
    }
  }

  const handleSendMoney = (amount, fromAccount, toAccount) => {
    setAccounts(
      accounts.map((account) =>
        account.name === fromAccount ? { ...account, balance: account.balance - amount } : account,
      ),
    )

    // Add transaction to store
    addTransaction({
      name: `Transfer to ${toAccount}`,
      amount: amount,
      type: "expense",
      category: "Transfer",
      status: "completed",
    })

    // Notify parent component
    if (onTransaction) {
      onTransaction({
        name: `Transfer to ${toAccount}`,
        amount: amount,
        type: "expense",
        category: "Transfer",
        status: "completed",
      })
    }
  }

  const handleRequestMoney = (amount, contact) => {
    // Add transaction to store
    addTransaction({
      name: `Money Request from ${contact.name}`,
      amount: amount,
      type: "income",
      category: "Request",
      status: "pending",
    })

    // Notify parent component
    if (onTransaction) {
      onTransaction({
        name: `Money Request from ${contact.name}`,
        amount: amount,
        type: "income",
        category: "Request",
        status: "pending",
      })
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Accounts Overview</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
        <p className="text-xs text-muted-foreground">Total balance across all accounts</p>
        <div className="mt-4 space-y-2">
          {accounts.map((account) => (
            <div key={account.name} className="flex justify-between items-center">
              <div>
                <span className="text-sm text-muted-foreground">{account.name}</span>
                <span className="text-xs text-muted-foreground ml-2">({account.bankName})</span>
              </div>
              <span className="text-sm font-medium">{formatCurrency(account.balance)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button size="sm" onClick={() => setIsAddMoneyModalOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
          <Button size="sm" onClick={() => setIsSendMoneyModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Send className="mr-2 h-4 w-4" /> Send
          </Button>
          <Button
            size="sm"
            onClick={() => setIsRequestMoneyModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <CreditCard className="mr-2 h-4 w-4" /> Request
          </Button>
          <Button size="sm" variant="outline">
            <MoreHorizontal className="mr-2 h-4 w-4" /> More
          </Button>
        </div>
      </CardContent>
      <AddMoneyModal
        isOpen={isAddMoneyModalOpen}
        onClose={() => setIsAddMoneyModalOpen(false)}
        onAddMoney={handleAddMoney}
        accounts={accounts}
      />
      <SendMoneyModal
        isOpen={isSendMoneyModalOpen}
        onClose={() => setIsSendMoneyModalOpen(false)}
        onSendMoney={handleSendMoney}
        accounts={accounts}
      />
      <RequestMoneyModal
        isOpen={isRequestMoneyModalOpen}
        onClose={() => setIsRequestMoneyModalOpen(false)}
        onRequestMoney={handleRequestMoney}
      />
    </Card>
  )
}
