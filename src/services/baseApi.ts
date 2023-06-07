// https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics
// https://bionicjulia.com/blog/implementing-rtk-query-in-react-native-app

import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import {AxiosError, AxiosRequestConfig} from 'axios';
import apiService from './apiServices';

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      body?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({url, method = 'GET', body, params, headers}) => {
    try {
      const result = await apiService({
        url: url,
        method,
        data: body,
        params,
        headers,
      });
      return {data: result.data};
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      if (err.response?.status === 401) {
        //handle expired token
      }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const baseApi = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: ['Auth'],
});
