import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import image1 from "/image1.webp";
import { useAppDispatch } from "../app/hook";
import { getUserData } from "../features/property/UserData";
import img from "/images.jpg";
import { loginUserData } from "../features/authController/Login";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const result = await dispatch(loginUserData(formData));

      if (loginUserData.fulfilled.match(result)) {
        // Fetch complete user data including role
        const userResult = await dispatch(getUserData());

        if (getUserData.fulfilled.match(userResult)) {
          const user = userResult.payload;

          toast.success("Login successful!", { duration: 3000 });

          // Redirect based on role
          if (user?.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        } else {
          toast.error("Failed to fetch user data");
          navigate("/");
        }
      } else {
        toast.error((result.payload as string) || "Login failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      console.log(error, "login form");
    } finally {
      setIsloading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-12 font-sans">
      <div className="md:col-span-6 bg-[#F5F5F5]">
        <div className="flex justify-center items-center h-dvh">
          <div className=" p-6 rounded-lg w-full max-w-xl">
            <h3 className="text-[clamp(1.5rem,5vw,2.5rem)] font-semibold mb-6">
              <div className="flex items-center">
                <span>
                  <img src={img} alt="" className="h-[2rem] px-2" />
                </span>
                <span className="inline-block text-[clamp(1.8rem, 10vw , 5rem)]">
                  Hi there, welcome!
                </span>
              </div>
            </h3>
            <Form
              onSubmit={handleSubmit}
              status="idle"
              errorMessage="Login failed. Please try again."
              successMessage="Login successful!"
              className="space-y-6 w-full"
            >
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md border-none outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md border-none outline-none"
                  required
                />
              </div>
              <Button
                className={`w-[8rem] ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                variant="lightgray"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Login"}
              </Button>
            </Form>
            <div className="text-center text-gray-500 mt-5">
              Don't have an account{" "}
              <Link
                to={"/signup"}
                className=" font-semibold text-black hover:underline-offset-2"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-6 relative h-dvh">
        <div className="relative w-full h-full overflow-hidden bg-gray-100">
          <img
            src={image1}
            alt="Login background"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/image1 (2).webp";
              e.currentTarget.classList.remove("opacity-0");
            }}
            style={{ transition: "opacity 0.5s" }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
