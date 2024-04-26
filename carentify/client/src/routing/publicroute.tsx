import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RouteProps {
  children?: ReactNode;
}

const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  return isAuthenticated ? <Navigate to="/admin" replace /> : <>{children}</>;
};

export default PublicRoute;
