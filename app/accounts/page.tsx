import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountsList } from "@/components/accounts/accounts-list"
import { AccountActivity } from "@/components/accounts/account-activity"
import { AccountSummary } from "@/components/accounts/account-summary"
import { AccountSettings } from "@/components/accounts/account-settings"
import { NewAccountButton } from "@/components/accounts/new-account-button"
import { Wallet, CreditCard, PiggyBank, TrendingUp } from "lucide-react"

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">Accounts</h1>
        <div className="flex items-center gap-2">
          <NewAccountButton />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Checking</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,580.25</div>
            <p className="text-xs text-muted-foreground">+₹1,245.00 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹48,750.80</div>
            <p className="text-xs text-muted-foreground">+₹850.00 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Card</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,450.15</div>
            <p className="text-xs text-muted-foreground">Balance due in 15 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹145,920.45</div>
            <p className="text-xs text-muted-foreground">+5.2% this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Account Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="accounts" className="space-y-4">
              <TabsList>
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="accounts">
                <AccountsList />
              </TabsContent>
              <TabsContent value="activity">
                <AccountActivity />
              </TabsContent>
              <TabsContent value="settings">
                <AccountSettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Account Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <AccountSummary />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
