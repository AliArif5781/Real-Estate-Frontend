import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3000/api/user",
  baseURL: "real-estate-backend-brown-nine.vercel.app/api/user",
  withCredentials: true,
});

export const searchApiPost = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "real-estate-backend-brown-nine.vercel.app",
  withCredentials: true,
});
