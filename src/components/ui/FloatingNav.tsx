"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, ArrowUp, Menu, X, Download } from "lucide-react"
import { domToPng } from "modern-screenshot"

const navItems = [
  { id: "macro", label: "宏观与竞争", icon: "📊" },
  { id: "financial", label: "财务表现", icon: "💰" },
  { id: "ip-matrix", label: "IP矩阵", icon: "🎨" },
  { id: "category", label: "品类与渠道", icon: "🛍️" },
  { id: "global", label: "全球化", icon: "🌍" },
  { id: "valuation", label: "估值建议", icon: "📈" },
]

export function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  const handleCapture = async () => {
    setIsCapturing(true)
    const mainElement = document.querySelector("main")
    if (mainElement) {
      try {
        const dataUrl = await domToPng(mainElement, {
          backgroundColor: "#fafafa",
          scale: 2,
        })
        const link = document.createElement("a")
        link.download = `泡泡玛特2025年报分析-${new Date().toLocaleDateString()}.png`
        link.href = dataUrl
        link.click()
      } catch (err) {
        console.error("Capture failed:", err)
      }
    }
    setIsCapturing(false)
  }

  return (
    <>
      {/* Desktop Nav */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? "w-[90%] max-w-4xl" : "w-auto"}`}>
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-violet-600">
            <span className="text-xl">POPMART</span>
            <span className="hidden sm:inline text-xs opacity-50 uppercase tracking-tighter">Report 2025</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs font-bold text-slate-500 hover:text-violet-600 transition-colors uppercase tracking-widest"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCapture}
              disabled={isCapturing}
              className="p-2 bg-violet-600 text-white rounded-xl shadow-lg shadow-violet-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              title="生成分享长图"
            >
              {isCapturing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="grid grid-cols-1 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 text-left font-bold"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 p-4 bg-white shadow-xl border border-slate-100 rounded-2xl text-violet-600"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
