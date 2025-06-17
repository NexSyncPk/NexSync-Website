import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import config from "../../config";
import { getToken } from "../components/utils/helpers";
import { routes } from "../components/utils/constants";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: config.SERVER_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config.method === "post") {
      toast.success(response?.data.message || "Your request was successful.");
    }
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data }: { status: number; data: any } = error.response;
      console.error(
        `Error: ${status}`,
        data?.message || "Unknown server error"
      );      if (error?.config && error?.config?.method === "post") {
        toast.error(data?.message || "An error occurred. Please try again.");
      }      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = routes.login; // Redirect to login page on unauthorized
      }} else if (error.request) {
      console.error("No response from server. Please try again later.");
      if (error.config?.method === "post") {
        toast.error("No response from server. Please try again later.");
      }
    } else {
      console.error("Axios configuration error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
