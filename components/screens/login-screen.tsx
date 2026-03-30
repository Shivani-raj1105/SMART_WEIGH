"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Scale, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useAppContext } from "@/lib/app-context"

interface LoginScreenProps {
  onRegister: () => void
  onForgotPassword: () => void
}

export function LoginScreen({ onRegister, onForgotPassword }: LoginScreenProps) {
  const { setIsAuthenticated, setUser } = useAppContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login
    setTimeout(() => {
      setUser({
        id: "1",
        name: "John Doe",
        email: email || "john@example.com",
        phone: "+1 234 567 8900",
        age: 30,
        sex: "male",
      })
      setIsAuthenticated(true)
      setIsLoading(false)
    }, 1000)
  }

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    setTimeout(() => {
      setUser({
        id: "1",
        name: "John Doe",
        email: "john@gmail.com",
        phone: "+1 234 567 8900",
        age: 30,
        sex: "male",
      })
      setIsAuthenticated(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <motion.div
        className="w-full max-w-sm relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
            <Scale className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Sign in to continue</p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border/50"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-secondary/50 border-border/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border/50" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border/50" />
            </div>

            {/* Google Sign In */}
            <Button
              variant="outline"
              className="w-full border-border/50 bg-secondary/30 hover:bg-secondary/50"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Register Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {"Don't have an account? "}
              <button
                type="button"
                onClick={onRegister}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
