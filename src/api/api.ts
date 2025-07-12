import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3000/api/user",
  baseURL: "https://real-estate-backend-five-omega.vercel.app/api/user",
  withCredentials: true,
});

export const searchApiPost = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://real-estate-backend-five-omega.vercel.app",
  withCredentials: true,
});
