import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAppDispatch } from "./app/hook";
import { useEffect, useState } from "react";
import { getUserData } from "./features/property/UserData";
import { Loader } from "./components/Loader";
import { Loading } from "./components/Loading";

export const App = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await dispatch(getUserData()).unwrap();
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return <RouterProvider router={router} />;
};
