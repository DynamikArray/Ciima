import axios from "axios";

const config = {
  baseURL: "/v1/",
  timeout: 10000
};

const clientAxios = axios.create({ ...config });

clientAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const axiosInstance = clientAxios;

export function createInterceptor(logout) {
  return {
    expired: err => {
      return new Promise(function(resolve, reject) {
        if (
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
          logout();
        }
        throw err;
      });
    }
  };
}
