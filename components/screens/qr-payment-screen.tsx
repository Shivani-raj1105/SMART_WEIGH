"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, QrCode } from "lucide-react"

interface QRPaymentScreenProps {
  onPaymentDone: () => void
}

export function QRPaymentScreen({ onPaymentDone }: QRPaymentScreenProps) {
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
          <h1 className="text-2xl font-bold text-foreground mb-2">Scan to Pay</h1>
          <p className="text-sm text-muted-foreground">
            Scan the QR code below to complete your payment
          </p>
        </div>

        {/* QR Code Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
          <CardContent className="p-6">
            <div className="bg-white rounded-xl p-4 mx-auto w-fit">
              {/* QR Code SVG */}
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="w-48 h-48"
              >
                {/* QR Code Pattern - Stylized representation */}
                <rect x="0" y="0" width="200" height="200" fill="white" />
                
                {/* Position Detection Patterns - Top Left */}
                <rect x="10" y="10" width="50" height="50" fill="#0a0a0f" />
                <rect x="15" y="15" width="40" height="40" fill="white" />
                <rect x="22" y="22" width="26" height="26" fill="#0a0a0f" />
                
                {/* Position Detection Pattern - Top Right */}
                <rect x="140" y="10" width="50" height="50" fill="#0a0a0f" />
                <rect x="145" y="15" width="40" height="40" fill="white" />
                <rect x="152" y="22" width="26" height="26" fill="#0a0a0f" />
                
                {/* Position Detection Pattern - Bottom Left */}
                <rect x="10" y="140" width="50" height="50" fill="#0a0a0f" />
                <rect x="15" y="145" width="40" height="40" fill="white" />
                <rect x="22" y="152" width="26" height="26" fill="#0a0a0f" />
                
                {/* Data Modules - Random pattern for visual effect */}
                <rect x="70" y="10" width="10" height="10" fill="#0a0a0f" />
                <rect x="90" y="10" width="10" height="10" fill="#0a0a0f" />
                <rect x="110" y="10" width="10" height="10" fill="#0a0a0f" />
                <rect x="70" y="25" width="10" height="10" fill="#0a0a0f" />
                <rect x="100" y="25" width="10" height="10" fill="#0a0a0f" />
                <rect x="120" y="25" width="10" height="10" fill="#0a0a0f" />
                <rect x="80" y="40" width="10" height="10" fill="#0a0a0f" />
                <rect x="110" y="40" width="10" height="10" fill="#0a0a0f" />
                
                <rect x="10" y="70" width="10" height="10" fill="#0a0a0f" />
                <rect x="30" y="70" width="10" height="10" fill="#0a0a0f" />
                <rect x="50" y="70" width="10" height="10" fill="#0a0a0f" />
                <rect x="70" y="70" width="10" height="10" fill="#0a0a0f" />
                <rect x="100" y="70" width="10" height="10" fill="#0a0a0f" />
                <rect x="120" y="70" width="10" height="10" fill="#0a0a0f" />
                <rect x="150" y="70" width="10" height="10" fill="#0a0a0f" />
                <rect x="170" y="70" width="10" height="10" fill="#0a0a0f" />
                
                <rect x="20" y="85" width="10" height="10" fill="#0a0a0f" />
                <rect x="40" y="85" width="10" height="10" fill="#0a0a0f" />
                <rect x="80" y="85" width="10" height="10" fill="#0a0a0f" />
                <rect x="110" y="85" width="10" height="10" fill="#0a0a0f" />
                <rect x="140" y="85" width="10" height="10" fill="#0a0a0f" />
                <rect x="160" y="85" width="10" height="10" fill="#0a0a0f" />
                <rect x="180" y="85" width="10" height="10" fill="#0a0a0f" />
                
                <rect x="10" y="100" width="10" height="10" fill="#0a0a0f" />
                <rect x="30" y="100" width="10" height="10" fill="#0a0a0f" />
                <rect x="50" y="100" width="10" height="10" fill="#0a0a0f" />
                <rect x="70" y="100" width="10" height="10" fill="#0a0a0f" />
                <rect x="90" y="100" width="10" height="10" fill="#0a0a0f" />
                <rect x="110" y="100" width="10" height="10" fill="#0a0a0f" />
                <rect x="130" y="100" width="10" height="10" fill="#0a0a0f" />
                <rect x="150" y="100" width="10" height="10" fill="#0a0a0f" />
                <rect x="170" y="100" width="10" height="10" fill="#0a0a0f" />
                
                <rect x="20" y="115" width="10" height="10" fill="#0a0a0f" />
                <rect x="40" y="115" width="10" height="10" fill="#0a0a0f" />
                <rect x="80" y="115" width="10" height="10" fill="#0a0a0f" />
                <rect x="100" y="115" width="10" height="10" fill="#0a0a0f" />
                <rect x="140" y="115" width="10" height="10" fill="#0a0a0f" />
                <rect x="180" y="115" width="10" height="10" fill="#0a0a0f" />
                
                <rect x="70" y="140" width="10" height="10" fill="#0a0a0f" />
                <rect x="90" y="140" width="10" height="10" fill="#0a0a0f" />
                <rect x="110" y="140" width="10" height="10" fill="#0a0a0f" />
                <rect x="130" y="140" width="10" height="10" fill="#0a0a0f" />
                <rect x="150" y="150" width="10" height="10" fill="#0a0a0f" />
                <rect x="170" y="150" width="10" height="10" fill="#0a0a0f" />
                
                <rect x="70" y="155" width="10" height="10" fill="#0a0a0f" />
                <rect x="100" y="155" width="10" height="10" fill="#0a0a0f" />
                <rect x="120" y="155" width="10" height="10" fill="#0a0a0f" />
                <rect x="140" y="165" width="10" height="10" fill="#0a0a0f" />
                <rect x="160" y="165" width="10" height="10" fill="#0a0a0f" />
                <rect x="180" y="165" width="10" height="10" fill="#0a0a0f" />
                
                <rect x="80" y="170" width="10" height="10" fill="#0a0a0f" />
                <rect x="110" y="170" width="10" height="10" fill="#0a0a0f" />
                <rect x="130" y="180" width="10" height="10" fill="#0a0a0f" />
                <rect x="150" y="180" width="10" height="10" fill="#0a0a0f" />
                <rect x="180" y="180" width="10" height="10" fill="#0a0a0f" />
              </svg>
            </div>
            
            {/* Amount Display */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
              <p className="text-3xl font-bold text-primary font-mono">₹25.00</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Instructions */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <QrCode className="w-4 h-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground text-center">
            Use any UPI app to scan and pay
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
            onClick={onPaymentDone}
          >
            <CheckCircle2 className="w-5 h-5" />
            Payment Done
          </Button>
        </motion.div>

        {/* Footer Note */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          Click the button above after completing payment
        </p>
      </motion.div>
    </motion.div>
  )
}
