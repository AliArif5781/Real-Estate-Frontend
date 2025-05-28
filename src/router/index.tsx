import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import { Signup } from "../pages/Signup";
import Login from "../pages/Login";
import HeroSection from "../pages/HeroSection";
import { Aboutus } from "../pages/Aboutus";
import NotFoundPage from "../pages/404Page";
import { UserProfile } from "../pages/UserProfile";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HeroSection />,
      },
      {
        path: "about",
        element: <Aboutus />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/userProfile",
    element: <UserProfile />,
  },
]);
