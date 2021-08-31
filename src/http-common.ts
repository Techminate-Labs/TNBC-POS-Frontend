import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://tnbpos.tk/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;