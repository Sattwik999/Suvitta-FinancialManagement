// components/ClientLayout.tsx
"use client"

import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SettingsProvider } from "@/contexts/settings-context"
import { Toaster } from "@/components/ui/toaster"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLandingPage = pathname === "/landing"
    const isloginPage = pathname === "/login"
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SettingsProvider>
        <TooltipProvider delayDuration={0}>
          {isLandingPage || isloginPage? (
            <main className="min-h-screen">{children}</main>
          ) : (
            <div className="min-h-screen flex">
              <Sidebar />
              <div className="flex-1">
                <TopNav />
                <div className="container mx-auto p-6 max-w-7xl">
                  <main className="w-full">{children}</main>
                </div>
              </div>
            </div>
          )}
          <Toaster />
        </TooltipProvider>
      </SettingsProvider>
    </ThemeProvider>
  )
}
