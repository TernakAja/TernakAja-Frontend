import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { User, AuthResponse, ErrorResponse } from "../types";

import { AxiosError } from "axios";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check authentication status on mount
  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, [token]);

  // Register user
  const register = async (
    email: string,
    password: string,
    name: string,
    role: string
  ) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        {
          email,
          password,
          name,
          role,
        }
      );
      // console.log(response.data);
      const { user, token } = response.data;
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error.response?.data as ErrorResponse;
        throw new Error(errorResponse?.error || "Registration failed");
      } else {
        // Handle other types of errors if necessary
        throw new Error("An unknown error occurred");
      }
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          email,
          password,
        }
      );
      const { user, token } = response.data;
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error.response?.data as ErrorResponse;
        throw new Error(errorResponse?.error || "Login failed");
      } else {
        // Handle other types of errors if necessary
        throw new Error("An unknown error occurred");
      }
    }
  };

  // Check if user is authenticated
  const checkAuth = async () => {
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const response = await axios.get<AuthResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/profile/${user?.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
