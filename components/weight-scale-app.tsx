"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AppProvider, useAppContext } from "@/lib/app-context"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SplashScreen } from "@/components/screens/splash-screen"
import { LoginScreen } from "@/components/screens/login-screen"
import { RegisterScreen } from "@/components/screens/register-screen"
import { OTPScreen } from "@/components/screens/otp-screen"
import { QRPaymentScreen } from "@/components/screens/qr-payment-screen"
import { HomeScreen } from "@/components/screens/home-screen"
import { AnalyticsScreen } from "@/components/screens/analytics-screen"
import { HistoryScreen } from "@/components/screens/history-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"

type AuthScreen = "login" | "register" | "otp"

function AppContent() {
  const { isAuthenticated } = useAppContext()
  const [showSplash, setShowSplash] = useState(true)
  const [showPayment, setShowPayment] = useState(false)
  const [authScreen, setAuthScreen] = useState<AuthScreen>("register")
  const [otpEmail, setOtpEmail] = useState("")
  const [activeTab, setActiveTab] = useState("home")

  // Auth screen handlers
  const handleRegister = () => setAuthScreen("register")
  const handleBackToLogin = () => setAuthScreen("login")
  const handleVerify = (email: string) => {
    setOtpEmail(email)
    setAuthScreen("otp")
  }
  const handleForgotPassword = () => {
    // Could implement forgot password screen
  }

  // Render auth screens
  const renderAuthScreen = () => {
    switch (authScreen) {
      case "register":
        return (
          <RegisterScreen
            onBack={handleBackToLogin}
            onVerify={handleVerify}
          />
        )
      case "otp":
        return (
          <OTPScreen
            email={otpEmail}
            onBack={handleBackToLogin}
          />
        )
      default:
        return (
          <LoginScreen
            onRegister={handleRegister}
            onForgotPassword={handleForgotPassword}
          />
        )
    }
  }

  // Render main app screens
  const renderMainScreen = () => {
    switch (activeTab) {
      case "analytics":
        return <AnalyticsScreen />
      case "history":
        return <HistoryScreen />
      case "profile":
        return <ProfileScreen onSaveSuccess={() => setActiveTab("home")} />
      default:
        return <HomeScreen />
    }
  }

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }

  // Show QR payment screen before home after authentication
  if (isAuthenticated && !showPayment) {
    return <QRPaymentScreen onPaymentDone={() => setShowPayment(true)} />
  }

  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={authScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {renderAuthScreen()}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderMainScreen()}
        </motion.div>
      </AnimatePresence>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export function WeightScaleApp() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
