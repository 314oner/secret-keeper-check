import axios from "axios";
import { API_URL } from "./config/service-path";

const privateClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

privateClient.interceptors.request.use((config) => {
  console.log(`[REQUEST AUTH] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.data || "");
  return config;
});

privateClient.interceptors.response.use(
  (response) => {
    console.log(`[RESPONSE AUTH] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error(`[ERROR AUTH] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.message);
    return Promise.reject(error);
  },
);

export default privateClient;
