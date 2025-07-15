import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import type React from "react";
interface Protected {
  children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: Protected) => {
  const { data, loading, initialized } = useAppSelector(
    (state) => state.userData
  );
  const location = useLocation();
  console.log(data, "protectedRoute");

  if (loading || !initialized) {
    return <div>Loading...!!!!!!!</div>; // Or your custom loader
  }

  if (!data?.userId) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
