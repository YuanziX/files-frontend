import { useAuth } from "@/hooks/use-auth";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { loading, isLoggedIn } = useAuth();

  const publicRoutes = ["/login", "/signup"];
  if (loading) return null;
  if (isLoggedIn && publicRoutes.includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!isLoggedIn && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
