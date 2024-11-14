import axios, { InternalAxiosRequestConfig } from "axios";
import { requestRefreshSession } from "./auth";
import useSessionStore from "@/store";

interface RequestPrams {
  method: "get" | "post" | "put" | "delete";
  endpoint: string;
  data?: object;
  header?: { [key: string]: string };
}

const apiClient = axios.create({
  baseURL: "/v1",
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const sessionStore = useSessionStore.getState();
    const refreshToken = localStorage.getItem("refreshToken");
    const expirationTime = sessionStore.expirationTime;
    const currentTime = Date.now();
    const timeLeft = expirationTime ? expirationTime - currentTime : 0;

    if (timeLeft <= 3 * 60 * 1000) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await requestRefreshSession(refreshToken!);

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      config.headers["Authorization"] = `Bearer ${newAccessToken}`;
    } else {
      const currentAccessToken = localStorage.getItem("accessToken");
      if (currentAccessToken) {
        config.headers["Authorization"] = `Bearer ${currentAccessToken}`;
      }
    }

    return config;
  }
);

const request = async ({
  method,
  endpoint,
  data,
  header = {},
}: RequestPrams) => {
  const url = `/v1/${endpoint}`;

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  return await axios({
    method,
    url,
    data,
    withCredentials: false,
    headers: {
      "Content-Type": header["Content-Type"] || "application/json",
      ...header,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export default request;
