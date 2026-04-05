"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from "recharts"

const data = [
  {
    year: "2024",
    grossMargin: 66.8, // Calculated: 8,707.8 / 13,037.7 * 100
    netMargin: 25.4    // Calculated: 3,308.3 / 13,037.7 * 100
  },
  {
    year: "2025",
    grossMargin: 72.1,
    netMargin: 35.1
  }
]

export function MarginChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[400px] w-full bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100 animate-pulse" />
  }

  return (
    <div className="h-[400px] w-full bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-slate-100">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} unit="%" />
          <Tooltip 
            formatter={(value: any) => [`${value}%`, '']}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line type="monotone" dataKey="grossMargin" name="毛利率" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 8, fill: '#8b5cf6', strokeWidth: 2, stroke: '#ffffff' }} activeDot={{ r: 10 }} />
          <Line type="monotone" dataKey="netMargin" name="净利率" stroke="#ec4899" strokeWidth={4} dot={{ r: 8, fill: '#ec4899', strokeWidth: 2, stroke: '#ffffff' }} activeDot={{ r: 10 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
