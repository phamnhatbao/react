import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'http://192.168.50.85',
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => {
    const result = queryString.stringify(params);
    console.log('paramsSerializer', result);
    return result;
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    console.log('axiosClient response', response);
    return response.data;
  }
}, err => {
  return {err};
});

export default axiosClient;
