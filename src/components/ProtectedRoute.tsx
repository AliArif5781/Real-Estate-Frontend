// import type React from "react";
// import { useAppSelector } from "../app/hook";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { data, initialized } = useAppSelector((state) => state.userData);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (initialized && !data) {
//       navigate("/login", { replace: true });
//     }
//   }, [data, initialized, navigate]);

//   if (!initialized) {
//     return <div>Loading...</div>; // Or your loading component
//   }
//   return data ? <>{children}</> : null;
// };

// export const AuthState = ({ children }: { children: React.ReactNode }) => {
//   const { data } = useAppSelector((state) => state.userData);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (data) {
//       navigate("/", { replace: true });
//     }
//   }, [data, navigate]);

//   return data ? <>{children}</> : null;
// };
