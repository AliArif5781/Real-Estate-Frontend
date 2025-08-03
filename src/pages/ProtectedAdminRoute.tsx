import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { data: userData } = useAppSelector((state) => state.userData);

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  if (userData.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
