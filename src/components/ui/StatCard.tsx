import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  unit?: string
  trend?: string
  isPositive?: boolean
  icon?: ReactNode
  className?: string
}

export function StatCard({ title, value, unit, trend, isPositive, icon, className }: StatCardProps) {
  return (
    <div className={cn("bg-white text-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between transition-all hover:shadow-md", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</h3>
        {icon && <div className="p-2 bg-slate-50 rounded-xl">{icon}</div>}
      </div>
      <div>
        <div className="flex items-baseline gap-1 mb-2">
          <p className="text-4xl font-black tracking-tight">{value}</p>
          {unit && <span className="text-sm font-bold text-slate-400">{unit}</span>}
        </div>
        {trend && (
          <div className="flex items-center text-sm font-bold">
            <span className={cn(
              "flex items-center px-2 py-0.5 rounded-full text-[10px]",
              trend.startsWith('+') ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            )}>
              {trend.startsWith('+') ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {trend}
            </span>
            <span className="text-slate-400 text-[10px] ml-2 font-medium uppercase tracking-tighter">对比去年</span>
          </div>
        )}
      </div>
    </div>
  )
}
