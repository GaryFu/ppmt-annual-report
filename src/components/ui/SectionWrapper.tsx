"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: ReactNode
  title: string
  icon?: ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, title, icon, className, id }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn("py-12 md:py-20 w-full", className)}
    >
      <div className="flex items-center gap-4 mb-8">
        {icon && <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">{icon}</div>}
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">{title}</h2>
      </div>
      {children}
    </motion.section>
  )
}
