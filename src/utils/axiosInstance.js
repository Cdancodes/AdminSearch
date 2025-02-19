import axios from 'axios';
import axiosRetry from 'axios-retry';
import {setupCache} from 'axios-cache-interceptor';
import { base_url } from 'config/constant';

const instance = axios.create({
  baseURL: base_url, 
  timeout: 10000, 
  headers: {'Content-Type': 'application/json'}, 
});

const axiosInstance = setupCache(instance);

axiosRetry(axiosInstance, {
  retries: 3, 
  retryDelay: retryCount => retryCount * 1000, 
  retryCondition: error => {
    return (
      axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error)
    );
  },
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      // showToastMessage({
      //   message: 'Please try again, May be slow internet connection',
      // });
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;