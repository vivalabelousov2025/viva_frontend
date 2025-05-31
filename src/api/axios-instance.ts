import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_URL,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  },
});
