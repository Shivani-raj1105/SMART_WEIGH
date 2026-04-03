"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppContext, MeasurementStatus } from "@/lib/app-context"
import { Search, Download, Calendar, Clock, Scale } from "lucide-react"

export function HistoryScreen() {
  const { measurementHistory } = useAppContext()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredHistory = useMemo(() => {
    return measurementHistory.filter((reading) => {
      // Filter by search (weight value)
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const weightStr = reading.weight.toString()
        const dateStr = new Date(reading.timestamp).toLocaleDateString()
        if (!weightStr.includes(query) && !dateStr.includes(query)) return false
      }
      
      return true
    })
  }, [measurementHistory, searchQuery])

  const groupedHistory = useMemo(() => {
    const groups: { [key: string]: typeof measurementHistory } = {}
    
    filteredHistory.forEach((reading) => {
      const dateKey = new Date(reading.timestamp).toDateString()
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(reading)
    })
    
    return Object.entries(groups).sort((a, b) => 
      new Date(b[0]).getTime() - new Date(a[0]).getTime()
    )
  }, [filteredHistory])

  const handleExport = () => {
    const csvContent = [
      ["ID", "Weight (kg)", "Status", "Timestamp"].join(","),
      ...measurementHistory.map((r) => 
        [r.id, r.weight, r.status, new Date(r.timestamp).toISOString()].join(",")
      ),
    ].join("\n")
    
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "measurement-history.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: MeasurementStatus) => {
    switch (status) {
      case "stable": return "bg-green-400"
      case "overload": return "bg-red-400"
      case "measuring": return "bg-yellow-400"
      default: return "bg-gray-400"
    }
  }

  const getStatusBadgeStyle = (status: MeasurementStatus) => {
    switch (status) {
      case "stable": return "bg-green-400/10 text-green-400"
      case "overload": return "bg-red-400/10 text-red-400"
      case "measuring": return "bg-yellow-400/10 text-yellow-400"
      default: return "bg-gray-400/10 text-gray-400"
    }
  }

  return (
    <motion.div
      className="min-h-screen pb-20 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="px-4 pt-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">History</h1>
            <p className="text-sm text-muted-foreground">{measurementHistory.length} total readings</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 bg-secondary/50"
            onClick={handleExport}
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by weight or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/30 border-border/50"
          />
        </div>

        {/* History List */}
        <div className="space-y-6">
          {groupedHistory.length === 0 ? (
            <Card className="bg-card/30 backdrop-blur-sm border-border/30">
              <CardContent className="p-8 text-center">
                <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No measurements found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {searchQuery ? "Try a different search term" : "Start measuring to see history"}
                </p>
              </CardContent>
            </Card>
          ) : (
            groupedHistory.map(([date, readings], groupIndex) => (
              <motion.div
                key={date}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: groupIndex * 0.1 }}
              >
                {/* Date Header */}
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {new Date(date).toDateString() === new Date().toDateString()
                      ? "Today"
                      : new Date(date).toDateString() === new Date(Date.now() - 86400000).toDateString()
                      ? "Yesterday"
                      : new Date(date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                  </span>
                  <span className="text-xs text-muted-foreground/50">
                    ({readings.length} readings)
                  </span>
                </div>

                {/* Readings */}
                <div className="space-y-2">
                  {readings.map((reading, index) => (
                    <motion.div
                      key={reading.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                    >
                      <Card className="bg-card/30 backdrop-blur-sm border-border/30 hover:bg-card/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {/* Status Indicator */}
                              <div className={`w-2 h-10 rounded-full ${getStatusColor(reading.status)}`} />
                              
                              {/* Weight */}
                              <div>
                                <p className="text-xl font-mono font-bold text-foreground">
                                  {reading.weight.toFixed(1)}
                                  <span className="text-sm font-normal text-muted-foreground ml-1">kg</span>
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Clock className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(reading.timestamp).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Status Badge */}
                            <span className={`text-xs px-3 py-1 rounded-full capitalize ${getStatusBadgeStyle(reading.status)}`}>
                              {reading.status}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  )
}
