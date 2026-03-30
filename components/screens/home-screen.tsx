"use client"

import { motion } from "framer-motion"
import { AmmeterCompass } from "@/components/ammeter-compass"
import { useAppContext } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw, Save, Scale, Activity, TrendingUp, Clock } from "lucide-react"

export function HomeScreen() {
  const {
    currentWeight,
    setCurrentWeight,
    measurementStatus,
    setMeasurementStatus,
    addMeasurement,
    measurementHistory,
  } = useAppContext()

  const handleTare = () => {
    setCurrentWeight(0)
    setMeasurementStatus("stable")
  }

  const handleSave = () => {
    addMeasurement({
      weight: currentWeight,
      timestamp: new Date(),
      status: currentWeight > 200 ? "overload" : "stable",
      unit: "kg",
    })
  }

  const handleWeightChange = (value: number[]) => {
    const newWeight = value[0]
    setCurrentWeight(newWeight)
    
    if (newWeight > 200) {
      setMeasurementStatus("overload")
    } else if (newWeight > 0) {
      setMeasurementStatus("measuring")
      setTimeout(() => setMeasurementStatus("stable"), 500)
    } else {
      setMeasurementStatus("stable")
    }
  }

  // Calculate stats
  const todayReadings = measurementHistory.filter(
    (r) => new Date(r.timestamp).toDateString() === new Date().toDateString()
  )
  const avgWeight = measurementHistory.length > 0
    ? measurementHistory.reduce((sum, r) => sum + r.weight, 0) / measurementHistory.length
    : 0

  // Calculate dynamic background gradient based on weight
  const getBackgroundGradient = () => {
    const percentage = Math.min(currentWeight / 200, 1)
    const lightness = 8 + (percentage * 2)
    return `radial-gradient(ellipse at center top, oklch(${lightness}% 0.03 ${195 - percentage * 30}) 0%, oklch(8% 0.02 250) 70%)`
  }

  return (
    <motion.div
      className="min-h-screen pb-20"
      style={{ background: getBackgroundGradient() }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-4 pt-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Weight Scale</h1>
            <p className="text-sm text-muted-foreground">Precision Measurement</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              measurementStatus === "stable" ? "bg-green-400" :
              measurementStatus === "measuring" ? "bg-yellow-400 animate-pulse" :
              measurementStatus === "overload" ? "bg-red-400 animate-pulse" :
              "bg-gray-400"
            }`} />
            <span className="text-xs text-muted-foreground capitalize">{measurementStatus}</span>
          </div>
        </div>

        {/* Ammeter Compass */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <AmmeterCompass
            weight={currentWeight}
            maxWeight={200}
            minWeight={0}
            status={measurementStatus}
          />
        </motion.div>

        {/* Weight Input Slider */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Adjust Weight</span>
                  <span className="text-sm font-mono text-primary">{currentWeight.toFixed(1)} kg</span>
                </div>
                <Slider
                  value={[currentWeight]}
                  onValueChange={handleWeightChange}
                  max={200}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 kg</span>
                  <span>100 kg</span>
                  <span>200 kg</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="flex gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="secondary"
            className="flex-1 gap-2 bg-secondary/50 hover:bg-secondary/70"
            onClick={handleTare}
          >
            <RotateCcw className="w-4 h-4" />
            Tare
          </Button>
          <Button
            variant="secondary"
            className="flex-1 gap-2 bg-secondary/50 hover:bg-secondary/70"
            onClick={handleTare}
          >
            <Scale className="w-4 h-4" />
            Reset
          </Button>
          <Button
            className="flex-1 gap-2 bg-primary/90 hover:bg-primary text-primary-foreground"
            onClick={handleSave}
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card/30 backdrop-blur-sm border-border/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Today</span>
              </div>
              <p className="text-xl font-bold text-foreground">{todayReadings.length}</p>
              <p className="text-xs text-muted-foreground">readings</p>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground">Average</span>
              </div>
              <p className="text-xl font-bold text-foreground">{avgWeight.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">kg</p>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-chart-2" />
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
              <p className="text-xl font-bold text-foreground">{measurementHistory.length}</p>
              <p className="text-xs text-muted-foreground">all time</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {measurementHistory.slice(0, 3).map((reading, index) => (
              <Card key={reading.id} className="bg-card/30 backdrop-blur-sm border-border/30">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      reading.status === "stable" ? "bg-green-400" :
                      reading.status === "overload" ? "bg-red-400" : "bg-yellow-400"
                    }`} />
                    <div>
                      <p className="font-mono text-foreground">{reading.weight.toFixed(1)} kg</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(reading.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    reading.status === "stable" 
                      ? "bg-green-400/10 text-green-400" 
                      : reading.status === "overload"
                      ? "bg-red-400/10 text-red-400"
                      : "bg-yellow-400/10 text-yellow-400"
                  }`}>
                    {reading.status}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
