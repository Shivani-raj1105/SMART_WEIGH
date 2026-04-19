"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface QRPaymentScreenProps {
  onPaymentDone: () => void
}

export function QRPaymentScreen({ onPaymentDone }: QRPaymentScreenProps) {
  const [isWaiting, setIsWaiting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(45)
  const [sessionId, setSessionId] = useState("")

  useEffect(() => {
  const init = async () => {
    try {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true

      await new Promise((resolve, reject) => {
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
      })

      console.log("Razorpay loaded")

    } catch (err) {
      console.error("Razorpay load error:", err)
    }
  }

  init()
}, [])

useEffect(() => {
  const createSession = async () => {
    try {
      const params = new URLSearchParams(window.location.search)
      const machineId = params.get("machineId") || "WX-001"

      const res = await fetch(`https://smaartweigh.onrender.com/scan/${machineId}`)
      
      // ⚠️ handle text response also (machine busy case)
      const contentType = res.headers.get("content-type")

      if (contentType && contentType.includes("application/json")) {
        const data = await res.json()

        if (data.status === "success") {
          setSessionId(data.sessionId)
          console.log("Session created:", data.sessionId)
        } else {
          alert("Machine busy. Try again.")
        }

      } else {
        const text = await res.text()
        alert(text) // "Machine currently in use"
      }

    } catch (err) {
      console.error("Session creation error:", err)
    }
  }

  createSession()
}, [])
  useEffect(() => {
    if (isWaiting && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (isWaiting && timeLeft === 0) {
      setIsWaiting(false)
      onPaymentDone()
    }
  }, [isWaiting, timeLeft, onPaymentDone])

  const handlePay = async () => {
  if (!sessionId) {
    alert("Session not ready. Try again.")
    return
  }

  try {
    // ✅ CREATE ORDER
    const res = await fetch("https://smaartweigh.onrender.com/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sessionId,
        amount: 2
      })
    })

    const data = await res.json()
    if (!data.orderId) {
  alert("Order creation failed")
  return
}

    // ✅ CHECK RAZORPAY
    if (!(window as any).Razorpay) {
      alert("Razorpay not loaded. Refresh page.")
      return
    }

    // ✅ OPEN RAZORPAY
    const options = {
      key: "rzp_test_SXMUErOVsOlGSu", // 🔥 your key
      amount: data.amount,
      currency: "INR",
      name: "Smart Weighing",
      description: "Weight Machine",
      order_id: data.orderId,

      handler: async function (response: any) {
        try {
          const verifyRes = await fetch("https://smaartweigh.onrender.com/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              sessionId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          })

          const verifyData = await verifyRes.json()

          if (verifyData.status === "success") {
            setIsWaiting(true)
            setTimeLeft(45)
          } else {
            alert("Payment verification failed")
          }

        } catch (err) {
          console.error("Verify error:", err)
        }
      }
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.open()

  } catch (err) {
    console.error("Payment error:", err)
  }
}
  if (isWaiting) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{
          background: "radial-gradient(ellipse at center top, oklch(12% 0.03 220) 0%, oklch(8% 0.02 250) 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-full max-w-sm text-center"
        >
          <p className="text-xl font-semibold text-green-600 mb-2">
            PAYMENT VERIFIED :)
          </p>
          <p className="text-2xl font-bold text-foreground mb-4">
            PLEASE STAND ON THE MACHINE NOW
          </p>
          <p className="text-lg text-muted-foreground">
            Time remaining: {timeLeft} seconds
          </p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: "radial-gradient(ellipse at center top, oklch(12% 0.03 220) 0%, oklch(8% 0.02 250) 70%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Smart Weighing</h1>
          <p className="text-sm text-muted-foreground">
            Ready to Pay
          </p>
        </div>

        {/* QR Code Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
          <CardContent className="p-6">
            <div className="bg-white rounded-xl p-4 mx-auto w-fit">
              {/* QR Code SVG */}
              <img
  src="/qr.png"
  alt="Machine QR (reference only)"
  className="w-48 h-48 opacity-40 pointer-events-none"
/>
            </div>
            
            {/* Amount Display */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
              <p className="text-3xl font-bold text-primary font-mono">₹2.00</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Instructions */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <p className="text-xs text-muted-foreground text-center">
            Machine connected. Click below to start your session. 
          </p>
        </div>

        {/* Payment Done Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
  className="w-full h-14 text-lg gap-3 bg-primary hover:bg-primary/90 text-primary-foreground"
  onClick={handlePay}
  disabled={!sessionId}
>
  {sessionId ? "Pay Now" : "Preparing machine..."}
</Button>
        </motion.div>

        {/* Footer Note */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          Ensure you are standing near the machine before proceeding
        </p>
      </motion.div>
    </motion.div>
  )
}
