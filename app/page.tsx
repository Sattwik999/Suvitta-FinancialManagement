"use client"

import { useState, useEffect } from "react"
import { AccountsOverview } from "@/components/accounts-overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { QuickBillPay } from "@/components/quick-bill-pay"
import { EMICard } from "@/components/dashboard/emi-card"
import { InsuranceCard } from "@/components/dashboard/insurance-card"
import { InvestmentCard } from "@/components/dashboard/investment-card"
import { SubscriptionCard } from "@/components/dashboard/subscription-card"
import { useTransactionStore } from "@/store/transaction-store"
import { useSettings } from "@/contexts/settings-context"

export default function Dashboard() {
  const { addTransaction } = useTransactionStore()
  const { settings } = useSettings()
  const [isClient, setIsClient] = useState(false)
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    setIsClient(true)

    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting("Good Morning")
    } else if (hour < 17) {
      setGreeting("Good Afternoon")
    } else {
      setGreeting("Good Evening")
    }
  }, [])

  // Function to handle transactions from any component
  const handleTransaction = (transaction) => {
    addTransaction(transaction)
  }

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-lg text-muted-foreground text-white">
          {greeting}, {settings.fullName.split(" ")[0]}! Here's your financial overview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AccountsOverview onTransaction={handleTransaction} />
        </div>
        <div className="lg:col-span-1">
          <RecentTransactions />
        </div>
        <div className="lg:col-span-1">
          <QuickBillPay onTransaction={handleTransaction} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <EMICard onTransaction={handleTransaction} />
        </div>
        <div className="lg:col-span-1">
          <InsuranceCard onTransaction={handleTransaction} />
        </div>
        <div className="lg:col-span-1">
          <SubscriptionCard onTransaction={handleTransaction} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <div className="md:col-span-1">
          <InvestmentCard />
        </div>
      </div>
    </div>
  )
}
