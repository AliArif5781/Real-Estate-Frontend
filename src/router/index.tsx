import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { HeroSection } from "../pages/HeroSection";
import { Aboutus } from "../pages/Aboutus";
import { PageNotFound } from "../pages/PageNotFound";
import { UserProfile } from "../pages/UserProfile";
import { MainPage } from "../pages/MainPage";
import { PostPage } from "../pages/PostPage";
import { PropertyPageList } from "../pages/PropertyPageList";
import ProtectedRoute from "../pages/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "about",
        element: <Aboutus />,
      },
      {
        path: "mainPage",
        element: <MainPage />,
      },
      {
        path: "userProfile",
        element: <UserProfile />,
      },
      {
        path: "postPage",
        element: <PostPage />,
      },
      {
        path: "/property/:id",
        // path: "/propertyPageList",
        element: <PropertyPageList />,
      },
    ],
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
