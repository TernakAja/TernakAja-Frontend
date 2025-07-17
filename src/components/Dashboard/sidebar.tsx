import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MilkIcon as Cow,
  BarChart3,
  CloudSun,
  Heart,
  Utensils,
  Settings,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Livestock",
    href: "/dashboard/livestock",
    icon: Cow,
    subItems: [
      {
        name: "Add Livestock",
        href: "/dashboard/livestock/add",
        icon: PlusCircle,
      },
    ],
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Weather",
    href: "/dashboard/weather",
    icon: CloudSun,
  },
  {
    name: "Health",
    href: "/dashboard/health",
    icon: Heart,
  },
  {
    name: "Feeding",
    href: "/dashboard/feeding",
    icon: Utensils,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleSubMenu = (name: string) => {
    setExpandedItem(expandedItem === name ? null : name);
  };

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar for mobile */}
      <motion.div
        className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
      >
        <motion.div
          className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg"
          initial={{ x: "-100%" }}
          animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="p-6">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#328E6E]">
                TernakAja
              </span>
            </a>
          </div>

          <nav className="mt-6 px-3">
            {navItems.map((item) => (
              <div key={item.name} className="mb-1">
                <div
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer",
                    isActive(item.href)
                      ? "bg-[#E1EEBC] text-[#328E6E]"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => {
                    if (item.subItems) {
                      toggleSubMenu(item.name);
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  <a
                    href={item.href}
                    className="flex items-center flex-1"
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                      } else {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </a>

                  {item.subItems && (
                    <span
                      className={`transform transition-transform ${
                        expandedItem === item.name ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  )}
                </div>

                {item.subItems && expandedItem === item.name && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm",
                          isActive(subItem.href)
                            ? "bg-[#E1EEBC]/50 text-[#328E6E]"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <subItem.icon className="h-4 w-4 mr-3" />
                        <span>{subItem.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </motion.div>
      </motion.div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:w-64">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="p-6">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#328E6E]">
                TernakAja
              </span>
            </a>
          </div>

          <nav className="mt-6 px-3 flex-1">
            {navItems.map((item) => (
              <div key={item.name} className="mb-1">
                <div
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer",
                    isActive(item.href)
                      ? "bg-[#E1EEBC] text-[#328E6E]"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => {
                    if (item.subItems) {
                      toggleSubMenu(item.name);
                    }
                  }}
                >
                  <a
                    href={item.href}
                    className="flex items-center flex-1"
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </a>

                  {item.subItems && (
                    <span
                      className={`transform transition-transform ${
                        expandedItem === item.name ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  )}
                </div>

                {item.subItems && expandedItem === item.name && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm",
                          isActive(subItem.href)
                            ? "bg-[#E1EEBC]/50 text-[#328E6E]"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        <subItem.icon className="h-4 w-4 mr-3" />
                        <span>{subItem.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="bg-[#E1EEBC]/30 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                Need help with your dashboard?
              </p>
              <a
                href="/contact"
                className="text-sm font-medium text-[#328E6E] hover:underline"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
