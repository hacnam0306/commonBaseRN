import axios, {AxiosError} from 'axios';
import store from '../store/store';
export const API_URL = 'https://mockapi.io/';

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

// Add a request interceptor
apiService.interceptors.request.use(
  async config => {
    config.url = config.baseURL! + config.url;
    const accessToken = store.getState().auth.token;
    if (accessToken) {
      config.headers.Authorization = accessToken;
      config.headers.Accept = 'application/json';
      config.timeout = 10000;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
apiService.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default apiService;
