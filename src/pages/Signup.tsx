import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { useState } from "react";
import image1 from "/image1.webp";
import { signup } from "../services/authControllers";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  const [isLoading, setIsloading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  console.log(setStatus);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    try {
      await signup(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );
      toast.success("Registration successful! Please verify your email.", {
        duration: 3000,
      });
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
      console.log(error, "Signupform");
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
            {/* <h3 className="text-4xl font-semibold mb-6">Hi there, welcome!</h3> */}
            <h3 className="text-4xl font-semibold mb-6">
              <span className="inline-block">Hi there, welcome!</span>
            </h3>
            <Form
              onSubmit={handleSubmit}
              status="idle"
              errorMessage="Signup failed. Please try again."
              successMessage="Account created successfully!"
              // submitText="Create Account"
              className="space-y-6 w-full"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-3 py-2 border rounded-md border-none outline-none"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-3 py-2 border rounded-md border-none outline-none"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
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

              {/* <div className="my-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[#F5F5F5] px-4 text-sm text-gray-400 font-medium">
                      OR CONTINUE WITH{" "}
                    </span>
                  </div>
                </div>

                Google Login Button
                <div className="flex justify-center mt-6">
                  <button className="px-5 py-3  max-w-xs flex items-center justify-center gap-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50 focus:outline-none">
                    <img
                      className="w-5 h-5"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      loading="lazy"
                      alt="Google logo"
                    />
                    <span>Continue with Google</span>
                  </button>
                </div>
              </div> */}
              <Button
                className={`w-[8rem] ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                variant="lightgray"
                isLoading={status === "submitting"}
                disabled={status === "submitting"}
              >
                {isLoading ? <Loader /> : "Signup"}
              </Button>
            </Form>
            <div className="text-center text-gray-500 mt-5">
              Already have an account{" "}
              <Link
                to={"/login"}
                className=" font-semibold text-black hover:underline-offset-2"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-6 relative h-dvh">
        <div className="relative w-full h-full overflow-hidden bg-gray-100">
          <img
            src={image1} // Main image
            alt="Signup background"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              // Replace with fallback image if main image fails
              e.currentTarget.src = "/image1 (2).webp";
              e.currentTarget.classList.remove("opacity-0"); // Remove if using fade-in
            }}
            // Optional: Fade-in effect
            style={{ transition: "opacity 0.5s" }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
