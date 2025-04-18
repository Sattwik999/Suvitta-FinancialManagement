"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  BarChart2,
  Building2,
  Wallet,
  Receipt,
  CreditCard,
  Video,
  Settings,
  MessagesSquare,
  TrendingUp,
  Calendar,
  LogOut,
  CreditCardIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { useSettings } from "@/contexts/settings-context"

// Navigation sections
const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Transactions", href: "/transactions", icon: Wallet },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Accounts", href: "/accounts", icon: Building2 },
  { name: "Stocks & Investments", href: "/investments", icon: TrendingUp },
  { name: "EMIs", href: "/emis", icon: Calendar },
  { name: "Subscriptions", href: "/subscriptions", icon: Receipt },
  { name: "Chat", href: "/chat", icon: MessagesSquare },
  { name: "Meetings", href: "/meetings", icon: Video },
]

const bottomNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "/login", icon: LogOut },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { settings } = useSettings()

  const handleMouseEnter = () => setIsCollapsed(false)
  const handleMouseLeave = () => setIsCollapsed(true)

  const handleLogout = (e) => {
    e.preventDefault()
    router.push("/login")
  }

  const NavItem = ({ item }) => (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        {item.name === "Logout" ? (
          <button
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "text-white hover:bg-secondary hover:text-white",
              isCollapsed && "justify-center px-2"
            )}
          >
            <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span>{item.name}</span>}
          </button>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-secondary text-black"
                : "text-white hover:bg-secondary hover:text-black",
              isCollapsed && "justify-center px-2"
            )}
          >
            <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        )}
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right" className="bg-black text-white flex items-center gap-4">
          {item.name}
        </TooltipContent>
      )}
    </Tooltip>
  )

  return (
    <TooltipProvider>
      <>
        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-md shadow-md"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle sidebar"
        >
          <CreditCardIcon className="h-6 w-6" />
        </button>

        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 z-20 flex flex-col bg-black text-white transition-all duration-300 ease-in-out lg:static",
            isCollapsed ? "w-[72px]" : "w-72",
            isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Logo at Top */}
          <div className="h-20 flex items-center  border-border px-2">
            <Link href="/" className="flex items-center justify-center w-full">
              <img
                src="/img/logo2.png"
                alt="Suvritt Logo"
                className={cn(
                  "object-contain",
                  isCollapsed ? "h-12 w-12" : "h-12 w-auto"
                )}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-border p-2">
            <nav className="space-y-1">
              {bottomNavigation.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>
          </div>
        </div>
      </>
    </TooltipProvider>
  )
}
