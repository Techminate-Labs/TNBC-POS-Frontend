import axios, { AxiosInstance } from "axios";
import store from '@/store'

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-type": "application/json"
  },
});

export default apiClient;