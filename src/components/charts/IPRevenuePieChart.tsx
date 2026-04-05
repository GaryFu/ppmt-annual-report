"use client"

import { useState, useEffect } from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts"

const data = [
  { name: "THE MONSTERS (LABUBU)", value: 141.61, color: "#8b5cf6" },
  { name: "SKULLPANDA", value: 35.40, color: "#ec4899" },
  { name: "CRYBABY", value: 29.29, color: "#f59e0b" },
  { name: "MOLLY", value: 28.97, color: "#10b981" },
  { name: "DIMOO", value: 27.77, color: "#3b82f6" },
  { name: "星星人 (STARGAZER)", value: 20.56, color: "#6366f1" },
  { name: "HIRONO", value: 17.35, color: "#94a3b8" },
  { name: "其他", value: 70.25, color: "#cbd5e1" }
]

export function IPRevenuePieChart() {
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
        <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any) => [`${value} 亿元`, '营收']}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
