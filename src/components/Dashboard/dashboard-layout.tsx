import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  BarChart3,
  Bell,
  ChevronLeft,
  MilkIcon as Cow,
  FileText,
  Heart,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Sun,
  Utensils,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/auth-context"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { name: "Livestock", href: "/dashboard/livestock", icon: <Cow className="h-5 w-5" /> },
    { name: "Health Monitoring", href: "/dashboard/health", icon: <Heart className="h-5 w-5" /> },
    { name: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Activity Tracking", href: "/dashboard/activity", icon: <Activity className="h-5 w-5" /> },
    { name: "Feeding Management", href: "/dashboard/feeding", icon: <Utensils className="h-5 w-5" /> },
    { name: "Weather", href: "/dashboard/weather", icon: <Sun className="h-5 w-5" /> },
    { name: "Reports", href: "/dashboard/reports", icon: <FileText className="h-5 w-5" /> },
    { name: "Messages", href: "/dashboard/messages", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Settings", href: "/dashboard/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
          isMobile && !isSidebarOpen && "-translate-x-full",
        )}
        initial={isMobile ? { x: "-100%" } : { x: 0 }}
        animate={isSidebarOpen ? { x: 0 } : isMobile ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <a href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#328E6E] rounded-md flex items-center justify-center text-white">
              <Cow className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent">
              Moorgan
            </span>
          </a>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-[#E1EEBC]/50 text-[#328E6E]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-gray-500">Farm Manager</div>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start mt-4 text-gray-600" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          {/* For logout */}
          <Button variant="ghost" className="w-full justify-start mt-4 text-gray-600" onClick={() => (logout())}>
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </Button>
        </div>
      </motion.div>

      {/* Main content */}
      <div
        className={cn("flex-1 transition-all duration-300 ease-in-out", isSidebarOpen && !isMobile ? "ml-64" : "ml-0")}
      >
        {/* Top navigation */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              {!isSidebarOpen && !isMobile && (
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
              <div className="relative w-64 max-w-full">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <div className="h-6 w-px bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline-block">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
