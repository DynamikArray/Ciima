import axios from "axios";

const config = {
  baseURL: "/v1/",
  timeout: 10000
};

/* Token Check and add to Headers */
const token = localStorage.getItem("token");
if (token) config.headers = { Authorization: `Bearer ${token}` };

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
