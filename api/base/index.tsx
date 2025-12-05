import axios from "axios";
import { toast } from "react-toastify";
import { store } from "@/redux/store";

export interface ApiOptions {
  url: string;
  method?: "get" | "post" | "put" | "patch" | "delete" | "head" | "options";
  payload?: Record<string, any>;
  params?: Record<string, any>;
}

const apiClient = axios.create({
    baseURL: "https://dgbeorwuitdiy.cloudfront.net",
});

apiClient.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json';
    return config;
});

export const api = async ({
    url,
    method = "get",
    payload = {},
    params = {},
}: ApiOptions) => {
    try {
        let response;

        switch (method.toLowerCase()) {
            case "get":
                response = await apiClient.get(url, { params });
                break;
            case "post":
                response = await apiClient.post(url, payload, { params });
                break;
            case "put":
                response = await apiClient.put(url, payload, { params });
                break;
            case "patch":
                response = await apiClient.patch(url, payload);
                break;
            case "delete":
                response = await apiClient.delete(url, { data: payload });
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        return response;
    } catch (error: any) {
        console.error("🚀 ~ api error:", error);

        if (error?.code === "ERR_NETWORK") {
            toast.error("Network error");
        } else if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something went wrong");
        }

        throw error;
    }
};