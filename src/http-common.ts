import axios, { AxiosInstance } from "axios";
import router from '@/router';

process.env.NODE_ENV

const apiClient: AxiosInstance = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? "https://tnbposapi.nathanaeljageni.fr/api" : "https://tnbposapi.nathanaeljageni.fr/api",
  baseURL: process.env.NODE_ENV === 'development' ? "http://127.0.0.1:8000/api" : "https://tnbposapi.nathanaeljageni.fr/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json",
    "X-XSRF-TOKEN": "XSRF-TOKEN"
  },
});

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  let path = '/error';
  switch (error.response.status) {
    case 401:
      console.log('401');
      path = '/';
      break;
    case 403: path = '/403'; break;
    case 404: path = '/404'; break;
    case 500: path = '/500'; break;
  }
  router.push(path);
  return Promise.reject(error);
});

export default apiClient;