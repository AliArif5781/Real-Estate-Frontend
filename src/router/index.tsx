import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import { Signup } from "../pages/Signup";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
