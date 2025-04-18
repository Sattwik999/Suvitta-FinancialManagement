// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import Link from "next/link"

// export default function LoginPage() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   })
//   const [registerData, setRegisterData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false)
//       // Redirect to dashboard
//       router.push("/")
//     }, 1500)
//   }

//   const handleRegister = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false)
//       // Redirect to dashboard
//       router.push("/")
//     }, 1500)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <img src="/placeholder.svg?height=64&width=64" alt="FinanceApp Logo" className="h-16 w-16" />
//           </div>
//           <h1 className="text-3xl font-bold text-primary">FinanceApp</h1>
//           <p className="text-muted-foreground">Manage your finances with ease</p>
//         </div>

//         <Tabs defaultValue="login" className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="login">Login</TabsTrigger>
//             <TabsTrigger value="register">Register</TabsTrigger>
//           </TabsList>
//           <TabsContent value="login">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Login</CardTitle>
//                 <CardDescription>Enter your credentials to access your account</CardDescription>
//               </CardHeader>
//               <form onSubmit={handleLogin}>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="name@example.com"
//                       value={loginData.email}
//                       onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <Label htmlFor="password">Password</Label>
//                       <Link href="/forgot-password" className="text-xs text-primary hover:underline">
//                         Forgot password?
//                       </Link>
//                     </div>
//                     <Input
//                       id="password"
//                       type="password"
//                       placeholder="••••••••"
//                       value={loginData.password}
//                       onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                       required
//                     />
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button type="submit" className="w-full" disabled={isLoading}>
//                     {isLoading ? "Logging in..." : "Login"}
//                   </Button>
//                 </CardFooter>
//               </form>
//             </Card>
//           </TabsContent>
//           <TabsContent value="register">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Create an account</CardTitle>
//                 <CardDescription>Enter your information to create an account</CardDescription>
//               </CardHeader>
//               <form onSubmit={handleRegister}>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name</Label>
//                     <Input
//                       id="name"
//                       placeholder="John Doe"
//                       value={registerData.name}
//                       onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="register-email">Email</Label>
//                     <Input
//                       id="register-email"
//                       type="email"
//                       placeholder="name@example.com"
//                       value={registerData.email}
//                       onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="register-password">Password</Label>
//                     <Input
//                       id="register-password"
//                       type="password"
//                       placeholder="••••••••"
//                       value={registerData.password}
//                       onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="confirm-password">Confirm Password</Label>
//                     <Input
//                       id="confirm-password"
//                       type="password"
//                       placeholder="••••••••"
//                       value={registerData.confirmPassword}
//                       onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
//                       required
//                     />
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button type="submit" className="w-full" disabled={isLoading}>
//                     {isLoading ? "Creating account..." : "Create account"}
//                   </Button>
//                 </CardFooter>
//               </form>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         <div className="mt-4 text-center">
//           <Link href="/" className="text-sm text-primary hover:underline">
//             Back to landing page
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard
      router.push("/")
    }, 1500)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/placeholder.svg?height=64&width=64" alt="FinanceApp Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-3xl font-bold text-primary">FinanceApp</h1>
          <p className="text-muted-foreground">Manage your finances with ease</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Register Form */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Enter your information to create an account</CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="name@example.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-primary hover:underline">
            Back to landing page
          </Link>
        </div>
      </div>
    </div>
  )
}
