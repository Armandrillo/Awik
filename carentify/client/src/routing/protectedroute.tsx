import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RouteProps {
  children?: ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
