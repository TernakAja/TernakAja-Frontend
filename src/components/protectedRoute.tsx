import { useAuth } from "@/context/auth-context";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, token } = useAuth();

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
