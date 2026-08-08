import axios from "axios";
import type { AxiosInstance } from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // config.headers.set("Authorization", `Bearer ${getToken()}`);
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error),
);
