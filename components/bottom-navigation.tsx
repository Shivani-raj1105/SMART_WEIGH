"use client"

import { motion } from "framer-motion"
import { Home, BarChart3, History, User } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "history", icon: History, label: "History" },
  { id: "profile", icon: User, label: "Profile" },
]

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center w-full h-full gap-0.5 transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-x-2 top-1 bottom-1 rounded-xl bg-gradient-to-b from-primary/20 to-transparent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </motion.div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
