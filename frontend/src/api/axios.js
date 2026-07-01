import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error?.response?.status === 401) {
      console.log("Unauthorized request 401");
    }
    return Promise.reject(
      error?.response?.data?.message || "Something went wrong",
    );
  },
);

export default api;
