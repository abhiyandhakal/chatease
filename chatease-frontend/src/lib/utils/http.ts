import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const handle401Error = (error: AxiosError) => {
  if (error?.response?.status === 401) {
    Cookies.remove("accessToken");
    window.location.href = "/";
  }
  return Promise.reject(error);
};

http.interceptors.response.use((response) => response, handle401Error);

export default http;
