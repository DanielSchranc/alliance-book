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

// TODO: Replace url with environment variable
export const API_URL = "https://swapi.py4e.com/api/";

export const httpClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
