import { api } from "../api/api";

export const getUserData = async () => {
  try {
    const response = await api.get("/data", { withCredentials: true });
    console.log(response.data, "getuserData");
    return response.data;
  } catch (error: any) {
    if (error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("user data not found");
  }
};
