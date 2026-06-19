import axios from "axios";
import { API_URL } from "./config/service-path";

const publicClient = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

publicClient.interceptors.request.use((config) => {
  console.log(`[REQUEST PUBLIC] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.data || "");
  return config;
});

publicClient.interceptors.response.use(
  (response) => {
    console.log(`[RESPONSE PUBLIC] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error(`[ERROR PUBLIC] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.message);
    return Promise.reject(error);
  },
);

export default publicClient;
