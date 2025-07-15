import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { useEffect } from "react";
import { getUserData } from "./features/property/UserData";

export const App = () => {
  const dispatch = useAppDispatch();

  const { initialized } = useAppSelector((state) => state.userData);
  // console.log(data, "app.tsx");
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

  // protected-Route
  if (!initialized) {
    return <div>Loading application...</div>;
  }

  return <RouterProvider router={router}></RouterProvider>;
};
