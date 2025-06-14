import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAppDispatch } from "./app/hook";
import { useEffect } from "react";
import { getUserData } from "./features/property/UserData";

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getUserData());
        console.log("user data loaded");
      } catch (error: any) {
        return error?.response?.data || "Failed to Fetch data";
      }
    };
    getData();
  }, [dispatch]);
  return <RouterProvider router={router}></RouterProvider>;
};
