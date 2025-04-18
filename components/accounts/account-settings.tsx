"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AccountSettings() {
  const [notifications, setNotifications] = useState({
    lowBalance: true,
    largeDeposits: true,
    largeWithdrawals: true,
    suspiciousActivity: true,
    statementReady: true,
    promotions: false,
  })

  const [preferences, setPreferences] = useState({
    defaultAccount: "checking",
    overdraftProtection: true,
    paperlessStatements: true,
    autoPayCreditCard: true,
    roundUpSavings: false,
  })

  return (
    <Tabs defaultValue="notifications" className="space-y-4">
      <TabsList>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="notifications" className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="lowBalance">Low Balance Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications when your account balance falls below a threshold.
              </p>
            </div>
            <Switch
              id="lowBalance"
              checked={notifications.lowBalance}
              onCheckedChange={(checked) => setNotifications({ ...notifications, lowBalance: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="largeDeposits">Large Deposit Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for deposits above a certain amount.
              </p>
            </div>
            <Switch
              id="largeDeposits"
              checked={notifications.largeDeposits}
              onCheckedChange={(checked) => setNotifications({ ...notifications, largeDeposits: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="largeWithdrawals">Large Withdrawal Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for withdrawals above a certain amount.
              </p>
            </div>
            <Switch
              id="largeWithdrawals"
              checked={notifications.largeWithdrawals}
              onCheckedChange={(checked) => setNotifications({ ...notifications, largeWithdrawals: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="suspiciousActivity">Suspicious Activity Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for potentially fraudulent activity.
              </p>
            </div>
            <Switch
              id="suspiciousActivity"
              checked={notifications.suspiciousActivity}
              onCheckedChange={(checked) => setNotifications({ ...notifications, suspiciousActivity: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="statementReady">Statement Ready Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications when your account statement is ready.
              </p>
            </div>
            <Switch
              id="statementReady"
              checked={notifications.statementReady}
              onCheckedChange={(checked) => setNotifications({ ...notifications, statementReady: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="promotions">Promotional Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about special offers and promotions.
              </p>
            </div>
            <Switch
              id="promotions"
              checked={notifications.promotions}
              onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
            />
          </div>
        </div>
        <Button>Save Notification Settings</Button>
      </TabsContent>
      <TabsContent value="preferences" className="space-y-4">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="defaultAccount">Default Account</Label>
            <Select
              value={preferences.defaultAccount}
              onValueChange={(value) => setPreferences({ ...preferences, defaultAccount: value })}
            >
              <SelectTrigger id="defaultAccount">
                <SelectValue placeholder="Select default account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Primary Checking</SelectItem>
                <SelectItem value="savings">High-Yield Savings</SelectItem>
                <SelectItem value="creditCard">Rewards Credit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="overdraftProtection">Overdraft Protection</Label>
              <p className="text-sm text-muted-foreground">
                Automatically transfer funds from savings to prevent overdrafts.
              </p>
            </div>
            <Switch
              id="overdraftProtection"
              checked={preferences.overdraftProtection}
              onCheckedChange={(checked) => setPreferences({ ...preferences, overdraftProtection: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="paperlessStatements">Paperless Statements</Label>
              <p className="text-sm text-muted-foreground">
                Receive electronic statements instead of paper statements.
              </p>
            </div>
            <Switch
              id="paperlessStatements"
              checked={preferences.paperlessStatements}
              onCheckedChange={(checked) => setPreferences({ ...preferences, paperlessStatements: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoPayCreditCard">Automatic Credit Card Payments</Label>
              <p className="text-sm text-muted-foreground">
                Automatically pay your credit card balance from your checking account.
              </p>
            </div>
            <Switch
              id="autoPayCreditCard"
              checked={preferences.autoPayCreditCard}
              onCheckedChange={(checked) => setPreferences({ ...preferences, autoPayCreditCard: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="roundUpSavings">Round-Up Savings</Label>
              <p className="text-sm text-muted-foreground">
                Round up purchases to the nearest dollar and transfer the difference to savings.
              </p>
            </div>
            <Switch
              id="roundUpSavings"
              checked={preferences.roundUpSavings}
              onCheckedChange={(checked) => setPreferences({ ...preferences, roundUpSavings: checked })}
            />
          </div>
        </div>
        <Button>Save Preferences</Button>
      </TabsContent>
      <TabsContent value="security" className="space-y-4">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
            </div>
            <Switch id="twoFactorAuth" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="loginNotifications">Login Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications when someone logs into your account.
              </p>
            </div>
            <Switch id="loginNotifications" defaultChecked />
          </div>
        </div>
        <Button>Update Security Settings</Button>
      </TabsContent>
    </Tabs>
  )
}
