import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

export const baseAxios = (url: string, option?: AxiosRequestConfig): AxiosInstance => {
  const ops: AxiosRequestConfig = Object.assign(
    {},
    {
      baseUrl: url,
      header: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      paramsSerializer: (params: Record<string, any>) => {
        return queryString.stringify(params);
      },
    },
    option,
  );

  const client = axios.create(ops);

  // Default interceptors
  client.interceptors.request.use((config) => config);

  client.interceptors.response.use(
    (response) => {
      if (response && response.data) return response.data;
      return [];
    },
    (error) => {
      if (error && error.response.status === 401) {
        // Handle logic to remove auth data
      }

      return Promise.reject(error);
    },
  );

  return client;
};

const axiosClient = baseAxios('http://localhost:3000');

export default axiosClient;
