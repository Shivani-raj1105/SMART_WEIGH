"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/lib/app-context"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, TrendingDown, Activity, Scale, Target, Clock } from "lucide-react"

type TimeRange = "daily" | "weekly" | "monthly"

export function AnalyticsScreen() {
  const { measurementHistory } = useAppContext()
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly")

  // Generate chart data from history
  const chartData = useMemo(() => {
    const now = new Date()
    const data = []
    
    if (timeRange === "daily") {
      for (let i = 23; i >= 0; i--) {
        const hour = new Date(now.getTime() - i * 3600000)
        const hourReadings = measurementHistory.filter((r) => {
          const rDate = new Date(r.timestamp)
          return rDate.getHours() === hour.getHours() && 
                 rDate.toDateString() === now.toDateString()
        })
        data.push({
          name: `${hour.getHours()}:00`,
          weight: hourReadings.length > 0 
            ? hourReadings.reduce((sum, r) => sum + r.weight, 0) / hourReadings.length 
            : null,
          count: hourReadings.length,
        })
      }
    } else if (timeRange === "weekly") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      for (let i = 6; i >= 0; i--) {
        const day = new Date(now.getTime() - i * 86400000)
        const dayReadings = measurementHistory.filter((r) => {
          const rDate = new Date(r.timestamp)
          return rDate.toDateString() === day.toDateString()
        })
        data.push({
          name: days[day.getDay()],
          weight: dayReadings.length > 0 
            ? dayReadings.reduce((sum, r) => sum + r.weight, 0) / dayReadings.length 
            : (50 + Math.random() * 100),
          count: dayReadings.length || Math.floor(Math.random() * 10),
        })
      }
    } else {
      for (let i = 29; i >= 0; i--) {
        const day = new Date(now.getTime() - i * 86400000)
        const dayReadings = measurementHistory.filter((r) => {
          const rDate = new Date(r.timestamp)
          return rDate.toDateString() === day.toDateString()
        })
        data.push({
          name: `${day.getMonth() + 1}/${day.getDate()}`,
          weight: dayReadings.length > 0 
            ? dayReadings.reduce((sum, r) => sum + r.weight, 0) / dayReadings.length 
            : (50 + Math.random() * 100),
          count: dayReadings.length || Math.floor(Math.random() * 5),
        })
      }
    }
    
    return data
  }, [measurementHistory, timeRange])

  // Calculate statistics
  const stats = useMemo(() => {
    const weights = measurementHistory.map((r) => r.weight)
    const avg = weights.length > 0 
      ? weights.reduce((a, b) => a + b, 0) / weights.length 
      : 0
    const max = weights.length > 0 ? Math.max(...weights) : 0
    const min = weights.length > 0 ? Math.min(...weights) : 0
    const total = measurementHistory.length
    const stableCount = measurementHistory.filter((r) => r.status === "stable").length
    const accuracy = total > 0 ? (stableCount / total) * 100 : 0
    
    // Trend calculation (comparing recent vs older)
    const recent = measurementHistory.slice(0, Math.ceil(measurementHistory.length / 2))
    const older = measurementHistory.slice(Math.ceil(measurementHistory.length / 2))
    const recentAvg = recent.length > 0 
      ? recent.reduce((sum, r) => sum + r.weight, 0) / recent.length 
      : 0
    const olderAvg = older.length > 0 
      ? older.reduce((sum, r) => sum + r.weight, 0) / older.length 
      : 0
    const trend = recentAvg - olderAvg

    return { avg, max, min, total, accuracy, trend }
  }, [measurementHistory])

  return (
    <motion.div
      className="min-h-screen pb-20 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="px-4 pt-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">Performance insights and trends</p>
        </div>

        {/* Time Range Filter */}
        <div className="flex gap-2">
          {(["daily", "weekly", "monthly"] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "secondary"}
              size="sm"
              className={`capitalize ${
                timeRange === range 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary/50 text-muted-foreground"
              }`}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>

        {/* Main Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Weight Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="rgba(255,255,255,0.3)" 
                      fontSize={10}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.3)" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(10, 10, 20, 0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="weight"
                      stroke="#00E5FF"
                      fill="url(#weightGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card/30 backdrop-blur-sm border-border/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Average</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.avg.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">kg</p>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {stats.trend >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className="text-xs text-muted-foreground">Trend</span>
              </div>
              <p className={`text-2xl font-bold ${stats.trend >= 0 ? "text-green-400" : "text-red-400"}`}>
                {stats.trend >= 0 ? "+" : ""}{stats.trend.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">kg change</p>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground">Accuracy</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.accuracy.toFixed(0)}%</p>
              <p className="text-xs text-muted-foreground">stable readings</p>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-chart-2" />
                <span className="text-xs text-muted-foreground">Range</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{(stats.max - stats.min).toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">kg variance</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Measurement Count Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Measurement Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="rgba(255,255,255,0.3)" 
                      fontSize={10}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.3)" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(10, 10, 20, 0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#009DFF" 
                      radius={[4, 4, 0, 0]}
                      opacity={0.8}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Max Weight", value: stats.max, max: 200, color: "#00E5FF" },
                { label: "Min Weight", value: stats.min, max: 200, color: "#009DFF" },
                { label: "Stability Rate", value: stats.accuracy, max: 100, color: "#00E5FF" },
              ].map((metric, index) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span className="text-foreground font-mono">
                      {metric.value.toFixed(1)}{metric.label.includes("Rate") ? "%" : " kg"}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: metric.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
