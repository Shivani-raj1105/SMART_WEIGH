"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Scale, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAppContext } from "@/lib/app-context"

interface OTPScreenProps {
  email: string
  onBack: () => void
}

export function OTPScreen({ email, onBack }: OTPScreenProps) {
  const { setIsAuthenticated, setUser } = useAppContext()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when complete
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async (code: string) => {
    setIsLoading(true)
    setTimeout(() => {
      // Try to get registration data from sessionStorage
      const registerDataStr = sessionStorage.getItem("registerData")
      let userData = {
        id: "1",
        name: "New User",
        email: email,
        phone: "",
        age: undefined as number | undefined,
        sex: undefined as "male" | "female" | "other" | undefined,
      }
      
      if (registerDataStr) {
        const registerData = JSON.parse(registerDataStr)
        userData = {
          id: "1",
          name: registerData.name || "New User",
          email: registerData.email || email,
          phone: registerData.phone || "",
          age: registerData.age,
          sex: registerData.sex,
        }
        sessionStorage.removeItem("registerData")
      }
      
      setUser(userData)
      setIsAuthenticated(true)
      setIsLoading(false)
    }, 1000)
  }

  const handleResend = () => {
    setResendTimer(30)
    // Simulate resend
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col p-6 bg-background"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors relative z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <motion.div
          className="w-full max-w-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
              <Scale className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Verify Account</h1>
            <p className="text-muted-foreground text-sm text-center mt-2">
              Enter the 6-digit verification code
              <br />
              <span className="text-primary/70 text-xs">(Use any 6 digits for demo)</span>
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              {/* OTP Inputs */}
              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-11 h-14 text-center text-xl font-mono bg-secondary/50 border border-border/50 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading || otp.some((digit) => !digit)}
                onClick={() => handleVerify(otp.join(""))}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>

              {/* Resend */}
              <div className="text-center mt-6">
                {resendTimer > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Resend code in <span className="text-primary">{resendTimer}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-sm text-primary hover:underline"
                  >
                    Resend verification code
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
