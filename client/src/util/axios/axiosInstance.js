import axios from "axios";

const config = {
  baseURL: "/v1/",
  timeout: 10000
};

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export const axiosInstance = axios.create({ ...config });

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
