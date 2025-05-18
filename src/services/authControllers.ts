import { api } from "../api/api";

export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post(
      "/signup",
      {
        firstName,
        lastName,
        email,
        password,
      },
      { withCredentials: true }
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Registration failed");
    }
    console.log(response, "response Signup");
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Registration Failed");
  }
};
