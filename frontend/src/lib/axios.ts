import axios, { AxiosError, type AxiosRequestConfig } from "axios";

interface RetryFailedRequestQueue {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}

// Queue to hold failed requests while token is being refreshed
const retryFailedRequestQueue: RetryFailedRequestQueue[] = [];

// Flag to indicate if token refresh is in progress
let isRefreshing = false;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v2",
  withCredentials: true,
});

const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v2",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((response) => response);

axiosInstance.interceptors.response.use(
  (response) => response,

  // Handle 401 errors by attempting to refresh the token
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.errorCode === "ERR_TOKEN_EXPIRED"
    ) {
      // refresh the token
      if (!isRefreshing) {
        isRefreshing = true;
        // console.log("refreshing....")

        try {
          // refresh the token
          await refreshInstance.post("/auth/refresh");

          // Process the queued requests
          retryFailedRequestQueue.forEach(({ config, reject, resolve }) => {
            axiosInstance
              .request(config)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
          });

          // Clear the queue and reset the refreshing flag
          retryFailedRequestQueue.length = 0;
          return axiosInstance(originalRequest);
        } catch (error: AxiosError | any) {
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      // while token is being refreshed, queue the failed request
      return new Promise((resolve, reject) => {
        retryFailedRequestQueue.push({
          resolve,
          reject,
          config: originalRequest,
        });
      });
    } else {
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;
