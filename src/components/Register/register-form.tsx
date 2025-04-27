import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/auth-context"

export default function RegisterForm() {

  const {register} = useAuth();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError1, setPasswordError1] = useState("")
  const [passwordError2, setPasswordError2] = useState("")
  const navigate = useNavigate();

  function matchPasswords(
    pw: string = password,
    cpw: string = confirmPassword
  ): void {
    if (pw.trim() !== cpw.trim()) {
      setPasswordError2("Passwords do not match");
    } else {
      setPasswordError2("");
    }
  }

  const validatePasswords = () => {
    if (password.length < 8) {
      setPasswordError1("Password must be at least 8 characters")
      return false
    }
    setPasswordError1("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePasswords()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await register(email, password, name, "user", 1);
      console.log("Registration response:", response);

      //short delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
    // console.log("Registration attempt with:", { name, email, password })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-lg border border-[#E1EEBC]"
    >
      <h2 className="text-2xl font-semibold text-[#328E6E] mb-6">Create an account</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#328E6E]">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-[#90C67C] focus-visible:ring-[#67AE6E]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#328E6E]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-[#90C67C] focus-visible:ring-[#67AE6E]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#328E6E]">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (password) validatePasswords()
                }}
                required
                className="border-[#90C67C] focus-visible:ring-[#67AE6E] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#328E6E]"
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {passwordError1 && <p className="text-red-500 text-xs mt-1">{passwordError1}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[#328E6E]">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (password) matchPasswords(password, e.target.value)
                }}
                required
                className="border-[#90C67C] focus-visible:ring-[#67AE6E] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#328E6E]"
              >
                {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {passwordError2 && <p className="text-red-500 text-xs mt-1">{passwordError2}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              required
              className="border-[#90C67C] data-[state=checked]:bg-[#328E6E] data-[state=checked]:border-[#328E6E]"
            />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-[#328E6E] hover:text-[#67AE6E] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#328E6E] hover:text-[#67AE6E] hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="submit" disabled={isLoading} className="w-full bg-[#328E6E] hover:bg-[#67AE6E] text-white">
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </motion.div>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <motion.span whileHover={{ scale: 1.05 }}>
          <Link to="/login" className="text-[#328E6E] hover:text-[#67AE6E] hover:underline">
            Log in
          </Link>
        </motion.span>
      </div>
    </motion.div>
  )
}
