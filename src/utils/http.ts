import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export type HTTPOptions = AxiosRequestConfig;
export type HTTPInstance = AxiosInstance;
export type HTTPResponse<T> = AxiosResponse<T>;
export type HTTPError<T> = AxiosError<T>;
export type HTTPGet<T, R = HTTPResponse<T>> = (
  url: string,
  config?: HTTPOptions,
) => Promise<R>;

export function httpClient(apiUrl: string) {
  return axios.create({
    baseURL: apiUrl,
    withCredentials: false,
  });
}
