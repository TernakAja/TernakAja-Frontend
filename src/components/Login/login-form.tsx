import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await login(email, password);

    // Reset loading state
    setIsLoading(false);

    // Here you would typically handle authentication
    console.log("Login attempt with:", { email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-lg border border-[#E1EEBC]"
    >
      <h2 className="text-2xl font-semibold text-[#328E6E] mb-6">
        Log in to your account
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
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
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#90C67C] focus-visible:ring-[#67AE6E] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#328E6E]"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="border-[#90C67C] data-[state=checked]:bg-[#328E6E] data-[state=checked]:border-[#328E6E]"
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </Label>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="text-sm text-[#328E6E] hover:text-[#67AE6E] hover:underline"
            >
              Forgot password?
            </motion.a>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#328E6E] hover:bg-[#67AE6E] text-white"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </motion.div>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <motion.span whileHover={{ scale: 1.05 }}>
          <Link
            to="/register"
            className="text-[#328E6E] hover:text-[#67AE6E] hover:underline"
          >
            Sign Up
          </Link>
        </motion.span>
      </div>
    </motion.div>
  );
}
