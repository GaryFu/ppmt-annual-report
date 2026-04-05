"use client"

import { useState, useRef, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  TrendingUp, Globe, ShoppingBag, Palette, Users, DollarSign, 
  ArrowUpRight, BarChart3, PieChart as PieChartIcon,
  LayoutDashboard, Camera, Check, Bell, User, Menu, X, 
  ChevronRight, ArrowUp, Download, Star, Sparkles, Rocket
} from "lucide-react"
import { cn } from "@/lib/utils"
import { domToPng } from "modern-screenshot"
import dynamic from "next/dynamic"

const RevenueGrowthChart = dynamic(() => import("@/components/charts/RevenueGrowthChart").then(mod => mod.RevenueGrowthChart), { ssr: false })
const IPRevenuePieChart = dynamic(() => import("@/components/charts/IPRevenuePieChart").then(mod => mod.IPRevenuePieChart), { ssr: false })
const MarginChart = dynamic(() => import("@/components/charts/MarginChart").then(mod => mod.MarginChart), { ssr: false })

// --- Reusable UI Components ---

interface StatCardProps {
  title: string
  value: string
  unit?: string
  trend?: string
  icon?: ReactNode
  className?: string
}

function StatCard({ title, value, unit, trend, icon, className }: StatCardProps) {
  return (
    <div className={cn("bg-white text-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between transition-all hover:shadow-md group", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</h3>
        {icon && <div className="p-2 bg-slate-50 group-hover:bg-violet-50 rounded-xl transition-colors">{icon}</div>}
      </div>
      <div>
        <div className="flex items-baseline gap-1 mb-2">
          <p className="text-3xl font-black tracking-tight">{value}</p>
          {unit && <span className="text-xs font-bold text-slate-400">{unit}</span>}
        </div>
        {trend && (
          <div className="flex items-center text-[10px] font-bold">
            <span className={cn(
              "flex items-center px-2 py-0.5 rounded-full",
              trend.startsWith('+') ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            )}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {trend}
            </span>
            <span className="text-slate-400 ml-2 font-medium uppercase tracking-tighter">对比去年</span>
          </div>
        )}
      </div>
    </div>
  )
}

// --- View Components ---

const OverviewView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
    {/* Hero Banner */}
    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 p-8 md:p-12 text-white shadow-2xl">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
      <div className="relative z-10 max-w-3xl">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-white bg-white/20 rounded-full border border-white/30 backdrop-blur-md">
          9992.HK | 2025 全方位解析
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
          泡泡玛特：史无前例的 <br />
          <span className="text-yellow-300">规模跃迁与盈利杠杆</span>
        </h2>
        <p className="text-lg md:text-xl opacity-90 leading-relaxed font-medium">
          2025年营收突破370亿，同比增长184.7%。毛绒业务异军突起，海外市场占比逼近50%，正式开启“综合IP运营商”时代。
        </p>
      </div>
    </div>

    {/* Key Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="营业总收入"
        value="371.2"
        unit="亿元"
        trend="+184.7%"
        icon={<DollarSign className="w-5 h-5 text-violet-500" />}
      />
      <StatCard
        title="年内溢利"
        value="130.1"
        unit="亿元"
        trend="+293.3%"
        icon={<TrendingUp className="w-5 h-5 text-fuchsia-500" />}
      />
      <StatCard
        title="整体毛利率"
        value="72.1"
        unit="%"
        trend="+5.3%"
        icon={<BarChart3 className="w-5 h-5 text-pink-500" />}
      />
      <StatCard
        title="海外直接业务"
        value="162.7"
        unit="亿元"
        trend="+291.9%"
        icon={<Globe className="w-5 h-5 text-indigo-500" />}
      />
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-800">营收与利润趋势</h3>
            <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">Revenue & Profit (CNY 100M)</p>
          </div>
          <div className="p-3 bg-violet-50 rounded-2xl text-violet-600">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <RevenueGrowthChart />
      </div>
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-800">盈利能力重构</h3>
            <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">Margin Reconstruction (%)</p>
          </div>
          <div className="p-3 bg-pink-50 rounded-2xl text-pink-600">
            <BarChart3 className="w-5 h-5" />
          </div>
        </div>
        <MarginChart />
      </div>
    </div>
  </motion.div>
)

const IPMatrixView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-4 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-black uppercase tracking-widest">
            IP Ecosystem
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">LABUBU的现象级爆发与内部生态失衡</h2>
          <p className="text-slate-500 leading-relaxed text-lg">
            2025年，泡泡玛特形成了以 THE MONSTERS (LABUBU) 为核心的单极化增长格局。LABUBU 全年营收达 141.61 亿元，贡献了超过 38% 的总收入。
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase mb-2 tracking-widest">LABUBU 营收</p>
              <p className="text-3xl font-black text-violet-600">141.6 亿</p>
              <p className="text-[10px] text-green-600 font-bold mt-1">+365.7% YoY</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase mb-2 tracking-widest">IP 破亿总数</p>
              <p className="text-3xl font-black text-pink-600">17 个</p>
              <p className="text-[10px] text-slate-400 font-bold mt-1">其中6个破20亿</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[450px]">
          <IPRevenuePieChart />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { name: "SKULLPANDA", value: "35.40 亿", share: "9.5%", icon: <Star className="text-pink-500" /> },
        { name: "CRYBABY", value: "29.29 亿", share: "7.9%", icon: <Sparkles className="text-orange-500" /> },
        { name: "MOLLY", value: "28.97 亿", share: "7.8%", icon: <Palette className="text-green-500" /> }
      ].map((ip) => (
        <div key={ip.name} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-50 rounded-2xl">{ip.icon}</div>
            <div>
              <h4 className="font-black text-slate-800">{ip.name}</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Revenue: {ip.value}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-black text-slate-600">{ip.share}</p>
            <p className="text-[10px] text-slate-300 font-bold uppercase">Share</p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
)

const ChannelView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-slate-900 text-white p-10 rounded-[3rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 blur-[100px] rounded-full" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="inline-block px-4 py-1.5 mb-8 text-sm font-semibold tracking-wider text-yellow-300 bg-yellow-500/10 rounded-full border border-yellow-500/30">
            Strategic Category Shift
          </div>
          <h2 className="text-4xl font-black mb-6 leading-tight">毛绒时代的降临：<br />从“玩具”向“生活方式”跨越</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-2xl">
            2025年，毛绒品类实现营收187.1亿元，同比暴涨560.6%，并在总收入占比中超越盲盒。这标志着泡泡玛特成功打破了“盲盒公司”的品牌刻板印象。
          </p>
          <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] opacity-40 font-bold uppercase mb-1">毛绒占比</p>
              <p className="text-2xl font-black text-yellow-300">50.4%</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] opacity-40 font-bold uppercase mb-1">私域会员</p>
              <p className="text-2xl font-black">7258万</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] opacity-40 font-bold uppercase mb-1">会员贡献</p>
              <p className="text-2xl font-black">93.7%</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] opacity-40 font-bold uppercase mb-1">TikTok营收</p>
              <p className="text-2xl font-black text-pink-400">2.62 亿</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-full flex flex-col">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">全球分发网络</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
            2025年海外直接业务收入为162.68亿元，同比强劲增长291.9%，在总营收中的占比提升至43.8%。
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-xs font-bold text-slate-400 uppercase">门店总数</span>
              <span className="font-black text-slate-800">630 家</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-xs font-bold text-slate-400 uppercase">东南亚增速</span>
              <span className="font-black text-green-600">+656%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

const StrategyView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center max-w-5xl mx-auto">
    <div className="space-y-4 mb-12">
      <h2 className="text-4xl font-black text-slate-800 tracking-tight">打造跨越周期的“综合IP运营商”</h2>
      <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
        向迪士尼、三丽鸥看齐，通过影视内容、顶级体育联动及沉浸式乐园，构建极深的内容护城河。
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: "进军影视工业", desc: "与索尼影业合作LABUBU大电影，为原本扁平的潮玩形象注入丰满的性格设定。", icon: <Camera size={32} />, color: "bg-violet-100 text-violet-600", tag: "大电影 2026" },
        { title: "绑定顶级体育IP", desc: "与FIFA 2026世界杯合作，加速男性与大众圈层渗透，打破传统受众限制。", icon: <Rocket size={32} />, color: "bg-blue-100 text-blue-600", tag: "世界杯 2026" },
        { title: "实体生态布局", desc: "乐园二期预计2027年动工，拔高核心IP市场声量，分担对单一IP的依赖。", icon: <Sparkles size={32} />, color: "bg-yellow-100 text-yellow-600", tag: "乐园二期" }
      ].map((item) => (
        <div key={item.title} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-md hover:shadow-2xl transition-all group relative overflow-hidden">
          <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full -z-10 transition-transform group-hover:scale-125", item.color.split(' ')[0])} />
          <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform", item.color)}>
            {item.icon}
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-4">{item.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">{item.desc}</p>
          <div className={cn("inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border", item.color.replace('bg-', 'border-').split(' ')[0])}>
            {item.tag}
          </div>
        </div>
      ))}
    </div>

    <div className="bg-slate-900 text-white p-12 rounded-[3rem] mt-12 text-left relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-600/20 blur-[120px] rounded-full" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-3xl font-black">估值锚定：恐慌砸出的“黄金坑”？</h3>
          <p className="text-slate-400 text-lg leading-relaxed">
            经历财报后股价暴跌，2026年远期市盈率回落至12.8-15.5倍历史低位。考虑到77.5%的ROE及超35%的净利率，公司基本面依然极其强劲。
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-widest">Forward P/E</p>
              <p className="text-2xl font-black">12.8x - 15.5x</p>
            </div>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-widest">ROE</p>
              <p className="text-2xl font-black text-fuchsia-400">77.5%</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="p-8 bg-white text-slate-900 rounded-[2rem] shadow-2xl transform rotate-2">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-green-600" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Analyst Rating</p>
            </div>
            <p className="text-4xl font-black mb-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">BUY</p>
            <p className="text-xs font-medium text-slate-500 leading-relaxed italic opacity-80">
              "股价已充分计价管理层保守指引。未来上半年增速极大概率超越 20% 基准线。"
            </p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

// --- Main Dashboard ---

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [captureSuccess, setCaptureSuccess] = useState(false)
  const dashboardRef = useRef<HTMLElement>(null)

  const handleCapture = async () => {
    if (!dashboardRef.current || isCapturing) return
    
    setIsCapturing(true)
    try {
      const dataUrl = await domToPng(dashboardRef.current, {
        backgroundColor: "#f8fafc",
        scale: 2,
      })
      
      const link = document.createElement("a")
      link.download = `POPMART-Insight-2025.png`
      link.href = dataUrl
      link.click()
      
      setCaptureSuccess(true)
      setTimeout(() => setCaptureSuccess(false), 3000)
    } catch (err) {
      console.error("Failed to capture dashboard:", err)
    } finally {
      setIsCapturing(false)
    }
  }

  const navItems = [
    { id: "overview", label: "核心看板", icon: LayoutDashboard },
    { id: "ip-matrix", label: "IP 生态", icon: Palette },
    { id: "channels", label: "品类渠道", icon: ShoppingBag },
    { id: "future", label: "未来战略", icon: Globe },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-violet-200">P</div>
        <div className="flex flex-col">
           <span className="font-black text-lg tracking-tight leading-none text-slate-900">泡泡玛特</span>
           <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-black">Annual Insight</span>
        </div>
      </div>
      
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => {
              setActiveTab(item.id)
              setIsMobileMenuOpen(false)
            }}
            className={cn(
              "flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold transition-all text-left group", 
              activeTab === item.id 
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                : "text-slate-500 hover:bg-slate-100"
            )}
          >
            <item.icon size={20} className={cn(activeTab === item.id ? "text-yellow-300" : "group-hover:text-violet-600")} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="mt-auto p-5 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner">
         <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-3">Report Toolkit</p>
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black text-slate-700">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               2025 Analysis
            </div>
            <button 
              onClick={handleCapture}
              disabled={isCapturing}
              className={cn(
                "p-2 rounded-xl transition-all duration-300",
                captureSuccess 
                  ? "bg-green-100 text-green-600 shadow-sm" 
                  : "bg-white text-slate-600 hover:bg-slate-900 hover:text-white border border-slate-200 shadow-sm"
              )}
            >
              {captureSuccess ? <Check size={18} /> : <Camera size={18} />}
            </button>
         </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans selection:bg-violet-100 selection:text-violet-600">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black">P</div>
          <span className="font-black text-slate-900 tracking-tight">POPMART INSIGHT</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <motion.aside 
              initial={{ x: -300 }} 
              animate={{ x: 0 }} 
              exit={{ x: -300 }} 
              className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 shadow-2xl flex flex-col"
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="w-72 border-r border-slate-200 p-8 flex-col hidden lg:flex sticky top-0 h-screen bg-white">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main ref={dashboardRef as any} className="flex-1 p-4 md:p-12 max-w-[1400px] mx-auto w-full bg-slate-50 overflow-y-auto overflow-x-hidden">
        {/* Top Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900">
              POPMART <span className="text-violet-600">ANNUAL</span> REPORT 2025
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                <Globe size={12} className="text-violet-500" /> Global Strategy
              </span>
              <span className="text-slate-200 text-xl font-thin">/</span>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Update: APR 2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="p-3 text-slate-400 hover:bg-white hover:text-violet-600 transition-all rounded-2xl relative border border-slate-200 bg-white shadow-sm group">
              <Bell size={22} className="group-hover:animate-swing" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-4 border border-slate-200 p-2 pr-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all cursor-default group">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center border border-violet-100 group-hover:bg-violet-600 transition-colors">
                <User size={22} className="text-violet-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black leading-none text-slate-900 uppercase">Senior Analyst</span>
                <span className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-tight">Strategy Research</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Views */}
        <div className="min-h-[calc(100vh-250px)] pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "overview" && <OverviewView />}
              {activeTab === "ip-matrix" && <IPMatrixView />}
              {activeTab === "channels" && <ChannelView />}
              {activeTab === "future" && <StrategyView />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Footer */}
        <footer className="mt-12 pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-slate-400 uppercase tracking-widest font-black">
          <p>© 2026 POPMART FINANCIAL INTELLIGENCE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-violet-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Contact Analyst</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
