"use client"

import { motion } from "framer-motion"
import { Scale } from "lucide-react"
import { useEffect } from "react"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated background pulse */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Logo */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6"
          animate={{
            boxShadow: [
              "0 0 20px rgba(0, 229, 255, 0.3)",
              "0 0 40px rgba(0, 229, 255, 0.5)",
              "0 0 20px rgba(0, 229, 255, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Scale className="w-12 h-12 text-primary-foreground" />
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-foreground mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          WeighScale Pro
        </motion.h1>

        <motion.p
          className="text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Precision Measurement System
        </motion.p>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        className="absolute bottom-20 flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
