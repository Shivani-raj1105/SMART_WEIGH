"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface RegisterScreenProps {
  onBack: () => void
  onVerify: (email: string) => void
}

export function RegisterScreen({ onBack, onVerify }: RegisterScreenProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [age, setAge] = useState("")
  const [sex, setSex] = useState<"male" | "female" | "other" | "">("")
  const [height, setHeight] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) return
    
    setIsLoading(true)
    // Store registration data in sessionStorage for OTP verification
    sessionStorage.setItem("registerData", JSON.stringify({
      name,
      email,
      phone,
      age: parseInt(age),
      sex,
      height: parseFloat(height)
    }))
    setTimeout(() => {
      setIsLoading(false)
      onVerify(email)
    }, 1000)
  }

  const handleGoogleSignUp = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onVerify("user@gmail.com")
    }, 1000)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col p-6 bg-background overflow-y-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />


      <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-6">
        <motion.div
          className="w-full max-w-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="/placeholder-logo.png"
              alt="Smart Weighing Logo"
              className="w-14 h-14 object-contain mb-4"
            />
            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Email ID</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                    required
                  />
                </div>

                {/* Age and Sex Row */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Age */}
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Age</label>
                    <Input
                      type="number"
                      placeholder="Age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="bg-secondary/50 border-border/50"
                      min="1"
                      max="150"
                      required
                    />
                  </div>

                  {/* Sex */}
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Sex</label>
                    <select
                      value={sex}
                      onChange={(e) => setSex(e.target.value as "male" | "female" | "other")}
                      className="w-full h-9 rounded-md bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="" disabled>Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">New Password</label>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`bg-secondary/50 border-border/50 ${
                      confirmPassword && password !== confirmPassword
                        ? "border-destructive"
                        : ""
                    }`}
                    required
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-destructive">Passwords do not match</p>
                  )}
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Height (cm)</label>
                  <Input
                    type="number"
                    placeholder="Enter your height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                    min="0"
                    required
                  />
                </div>

                {/* Register Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2"
                  disabled={
                    isLoading ||
                    (confirmPassword !== "" && password !== confirmPassword) ||
                    !height
                  }
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>

              {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border/50" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              {/* Google Sign Up */}
              <Button
                variant="outline"
                className="w-full border-border/50 bg-secondary/30 hover:bg-secondary/50"
                onClick={handleGoogleSignUp}
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

              {/* Login Link */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onBack}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
