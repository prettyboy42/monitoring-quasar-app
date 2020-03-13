import { AxiosRequestConfig } from 'axios';

export interface User {
  name: string;
  avatar: string;
  time: number;
  header: string;
  roles: string[];
}

export interface ApiRequest {
  url: string;
  config?: AxiosRequestConfig;
  data: object;
}

export interface ApiResult {
  error: number;
  message: string;
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: any;
    user?: User;
  };
}
