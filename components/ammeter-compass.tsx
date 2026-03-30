"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

interface AmmeterCompassProps {
  weight: number
  maxWeight?: number
  minWeight?: number
  status?: "stable" | "measuring" | "overload" | "disconnected"
}

export function AmmeterCompass({
  weight,
  maxWeight = 200,
  minWeight = 0,
  status = "stable",
}: AmmeterCompassProps) {

  const centerX = 150
  const centerY = 150

  // ✅ Needle angle (compressed range)
  // ✅ Needle angle (Adjusted to point UP at the arc)
  // ✅ Needle angle (Adjusted to point UP at the arc)
  const needleAngle = useMemo(() => {
    const clampedWeight = Math.max(minWeight, Math.min(weight, maxWeight));
    const percentage = (clampedWeight - minWeight) / (maxWeight - minWeight);

    // 180 is the total sweep of your arc
    // + 90 shifts the "downward" needle to the left (9 o'clock) for 0kg
    return (percentage * 180) + 90;
  }, [weight, maxWeight, minWeight]);

  // Dynamic glow color
  const getGradientColor = useMemo(() => {
    const percentage = Math.min(weight / maxWeight, 1)
    const g = Math.round(229 - percentage * (229 - 60))
    const b = Math.round(255 - percentage * (255 - 143))
    return `rgb(0, ${g}, ${b})`
  }, [weight, maxWeight])

  // ✅ Ticks
  const ticks = useMemo(() => {
    const tickArray = []
    const step = maxWeight / 10

    for (let i = 0; i <= 10; i++) {
      const value = minWeight + (step * i)
      const angle = -180 + (i * 18)
      const isMajor = i % 2 === 0
      tickArray.push({ value, angle, isMajor })
    }

    return tickArray
  }, [maxWeight, minWeight])

  // ✅ Arc segments
  const arcSegments = useMemo(() => {
    const segments = []
    const totalSegments = 20

    for (let i = 0; i < totalSegments; i++) {
      const percentage = i / totalSegments
      const startAngle = -180 + (percentage * 180)
      const endAngle = -180 + ((i + 1) / totalSegments * 180)

      const lightness = 85 - (percentage * 60)
      const hue = 195 - (percentage * 30)

      segments.push({
        startAngle,
        endAngle,
        color: `oklch(${lightness}% 0.15 ${hue})`,
      })
    }

    return segments
  }, [])

  const statusColors = {
    stable: "#00E5FF",
    measuring: "#FFB300",
    overload: "#FF5252",
    disconnected: "#757575",
  }

  return (
    <div className="relative w-full max-w-md mx-auto flex justify-center -mb-6 mt-0">
      <svg
        viewBox="0 0 300 300"
        className="w-full h-auto overflow-visible"
        style={{ filter: `drop-shadow(0 0 15px ${getGradientColor}40)` }}
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#003C8F" /> {/* Base/Hub color */}
            <stop offset="100%" stopColor="#00E5FF" /> {/* Tip/Glow color */}
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 🔥 Bottom shadow arc (NEW) */}
        <path
          d={`M ${centerX - 160} ${centerY} 
             A 160 160 0 0 0 ${centerX + 160} ${centerY}`}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="20"
        />

        {/* Outer arc */}
        <path
          d={`M ${centerX - 160} ${centerY} 
             A 160 160 0 0 1 ${centerX + 160} ${centerY}`}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="30"
        />

        {/* Gradient arc */}
        {arcSegments.map((segment, index) => {
          const innerRadius = 130
          const outerRadius = 155
          const startRad = (segment.startAngle * Math.PI) / 180
          const endRad = (segment.endAngle * Math.PI) / 180

          const x1Inner = centerX + innerRadius * Math.cos(startRad)
          const y1Inner = centerY + innerRadius * Math.sin(startRad)
          const x2Inner = centerX + innerRadius * Math.cos(endRad)
          const y2Inner = centerY + innerRadius * Math.sin(endRad)

          const x1Outer = centerX + outerRadius * Math.cos(startRad)
          const y1Outer = centerY + outerRadius * Math.sin(startRad)
          const x2Outer = centerX + outerRadius * Math.cos(endRad)
          const y2Outer = centerY + outerRadius * Math.sin(endRad)

          return (
            <path
              key={index}
              d={`M ${x1Inner} ${y1Inner}
                 A ${innerRadius} ${innerRadius} 0 0 1 ${x2Inner} ${y2Inner}
                 L ${x2Outer} ${y2Outer}
                 A ${outerRadius} ${outerRadius} 0 0 0 ${x1Outer} ${y1Outer}
                 Z`}
              fill={segment.color}
              opacity={0.9}
            />
          )
        })}

        {/* Ticks */}
        {ticks.map((tick, index) => {
          const rad = (tick.angle * Math.PI) / 180
          const innerR = tick.isMajor ? 110 : 118
          const outerR = 125
          const labelR = 170

          const x1 = centerX + innerR * Math.cos(rad)
          const y1 = centerY + innerR * Math.sin(rad)
          const x2 = centerX + outerR * Math.cos(rad)
          const y2 = centerY + outerR * Math.sin(rad)
          const labelX = centerX + labelR * Math.cos(rad)
          const labelY = centerY + labelR * Math.sin(rad)

          return (
            <g key={index}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={tick.isMajor ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)"}
                strokeWidth={tick.isMajor ? 2 : 1}
              />
              {tick.isMajor && (
                <text
                  x={labelX}
                  y={labelY}
                  fill="rgba(255,255,255,0.7)"
                  fontSize="14"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {Math.round(tick.value)}
                </text>
              )}
            </g>
          )
        })}

        {/* Center hub (reduced glow) */}
        <circle cx={centerX} cy={centerY} r="20" fill="rgba(0,0,0,0.85)" />
        <circle cx={centerX} cy={centerY} r="14" fill={statusColors[status]} filter="url(#glow)" />
        <circle cx={centerX} cy={centerY} r="8" fill="rgba(0,0,0,0.6)" />

        {/* Needle */}
        {/* Needle Group */}
      <motion.g
        // We place the pivot point exactly at the center of your gauge
        initial={false}
        animate={{ 
          x: 150, 
          y: 150, 
          rotate: (weight / 200) * 180 - 90 
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* This invisible circle is the "anchor". 
          It ensures the rotation happens around 0,0 (the center of the group) 
        */}
        <circle r="110" fill="none" />

        {/* The Needle: Drawn pointing straight UP.
          Base is at 0,0. Tip is at 0,-110.
        */}
        <polygon
          points="-3,0 3,0 0,-110"
          fill="url(#gaugeGradient)"
          filter="url(#glow)"
        />

        {/* Center Cap (The glowing blue hub) */}
        <circle r="8" fill="#000" stroke="#00E5FF" strokeWidth="3" />
        <circle r="4" fill="#00E5FF">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </motion.g>
        {/* Center cap */}
        <circle cx={centerX} cy={centerY} r="6" fill="#0a0a0f" stroke={getGradientColor} strokeWidth="2" />

        {/* Unit */}
        <text
          x={centerX}
          y={centerY + 55}
          fill="rgba(255,255,255,0.6)"
          fontSize="16"
          textAnchor="middle"
        >
          kg
        </text>
      </svg>
    </div>
  )
}