import Button from "../components/Button";
import { Form } from "../components/Form";
import { useState } from "react";
import image1 from "/image1.webp";

export const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setStatus("submitting");
    // Add your form submission logic here
    // On success: setStatus("success")
    // On error: setStatus("error")
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
              status="idle"
              errorMessage="Signup failed. Please try again."
              successMessage="Account created successfully!"
              submitText="Create Account"
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
                  minLength={8}
                />
              </div>
              <Button
                type="submit"
                variant="lightgray"
                isLoading={status === "submitting"}
                disabled={status === "submitting"}
              >
                submitText
              </Button>
            </Form>
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
