import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import { Signup } from "../pages/Signup";

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
]);
