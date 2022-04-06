import axios, { AxiosRequestConfig } from "axios";

const baseURL = "http://localhost:5000";

const http = axios.create({
  baseURL,
});

http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const access = localStorage.getItem("access");
    if (access) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      return http
        .post("/auth/refresh", {
          token: localStorage.getItem("refresh"),
        })
        .then((res) => {
          localStorage.setItem("access", res.data);
          http.defaults.headers.common.Authorization = `Bearer ${res.data}`;
          return http(originalRequest);
        });
    }
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    return Promise.reject(error);
  }
);

export { http };
