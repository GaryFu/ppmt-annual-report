"use client"

import {
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Line,
  ComposedChart
} from "recharts"

const data = [
  {
    year: "2024",
    revenue: 130.38,
    profit: 33.08
  },
  {
    year: "2025",
    revenue: 371.20,
    profit: 130.12
  }
]

export function RevenueGrowthChart() {
  return (
    <div className="h-[400px] w-full bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-slate-100">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
          <YAxis yAxisId="left" orientation="left" stroke="#8b5cf6" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
          <YAxis yAxisId="right" orientation="right" stroke="#ec4899" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={10} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            cursor={{ fill: '#f8fafc' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar yAxisId="left" dataKey="revenue" name="总营收 (亿元)" fill="#8b5cf6" radius={[6, 6, 0, 0]} maxBarSize={60} />
          <Line yAxisId="right" type="monotone" dataKey="profit" name="年内溢利 (亿元)" stroke="#ec4899" strokeWidth={4} dot={{ r: 8, fill: '#ec4899', strokeWidth: 2, stroke: '#ffffff' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
