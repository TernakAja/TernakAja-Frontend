import { motion } from "framer-motion"
import Sidebar from "./sidebar"
import type { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="lg:pl-64">
        <main className="p-4 md:p-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
