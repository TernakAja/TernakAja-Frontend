import { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { useTranslation } from "react-i18next";

const navas = [
  { name: "Home", href: "/" },
  { name: "Our Team", href: "/team" },
  { name: "Article", href: "/article" },
  { name: "Community Forum", href: "/forum" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "All Features", href: "/features" },
];

const navasID = [
  { name: "Halaman Utama", href: "/" },
  { name: "Tim Kami", href: "/team" },
  { name: "Artikel", href: "/article" },
  { name: "Forum", href: "/forum" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Semua Fitur", href: "/features" },
];

export default function Navbar() {
  const nowLanguage = localStorage.getItem("language");

  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(nowLanguage === "en" ? "id" : "en"); // Default to English

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "id" : "en";
    setLanguage(newLanguage);
    // You can also store this in localStorage to persist the language choice
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "id")) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent">
            TernakAja
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {language === "id"
            ? navasID.map((a) => (
                <a
                  key={a.name}
                  href={a.href}
                  className="text-gray-700 hover:text-[#328E6E] transition-colors font-medium"
                >
                  {a.name}
                </a>
              ))
            : navas.map((a) => (
                <a
                  key={a.name}
                  href={a.href}
                  className="text-gray-700 hover:text-[#328E6E] transition-colors font-medium"
                >
                  {a.name}
                </a>
              ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-gray-700 hover:text-[#328E6E] hover:bg-gray-100"
          >
            <Globe size={16} className="mr-2" />
            {language === "en" ? "ID" : "EN"}
          </Button>
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Button
                className="bg-[#328E6E] hover:bg-[#67AE6E] text-white"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white bg-transparent"
                onClick={() => navigate("/login")}
              >
                {language === "id" ? "Masuk" : "Login"}
              </Button>
              <Button
                className="bg-[#328E6E] hover:bg-[#67AE6E] text-white"
                onClick={() => navigate("/register")}
              >
                {language === "id" ? "Daftar" : "Sign In"}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navas.map((a) => (
                <a
                  key={a.name}
                  href={a.href}
                  className="text-gray-700 hover:text-[#328E6E] py-2 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {a.name}
                </a>
              ))}

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-gray-700 hover:text-[#328E6E] hover:bg-gray-100 justify-start"
              >
                <Globe size={16} className="mr-2" />
                {language === "en" ? "Bahasa Indonesia" : "English"}
              </Button>

              <div className="flex flex-col gap-2 mt-4">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                    <Button
                      className="bg-[#328E6E] hover:bg-[#67AE6E] text-white"
                      onClick={() => navigate("/dashboard")}
                    >
                      Dashboard
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      className="bg-[#328E6E] hover:bg-[#67AE6E] text-white"
                      onClick={() => navigate("/register")}
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
