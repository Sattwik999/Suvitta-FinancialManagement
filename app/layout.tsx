// import "./globals.css"
// import { Inter } from "next/font/google"
// import { ThemeProvider } from "@/components/theme-provider"
// import { Sidebar } from "@/components/sidebar"
// import { TopNav } from "@/components/top-nav"
// import { TooltipProvider } from "@/components/ui/tooltip"
// import { SettingsProvider } from "@/contexts/settings-context"
// import type React from "react"
// import { Toaster } from "@/components/ui/toaster"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "SUVRITT",
//   description: "Your Personal Financial Dashboard",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//           <SettingsProvider>
//             <TooltipProvider delayDuration={0}>
//               <div className="min-h-screen flex">
//                 <Sidebar />
//                 <div className="flex-1">
//                   <TopNav />
//                   <div className="container mx-auto p-6 max-w-7xl">
//                     <main className="w-full">{children}</main>
//                   </div>
//                 </div>
//               </div>
//               <Toaster />
//             </TooltipProvider>
//           </SettingsProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }


// app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SUVRITT",
  description: "Your Personal Financial Dashboard",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
