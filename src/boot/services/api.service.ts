import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { axiosMain } from '../axios';
import { ApiRequest, ApiResult } from './types';

export default class ApiService {
  // public constructor(baseUrl: string, headerParams?: object) {
  //   this.init(baseUrl);
  //   this.setHeader(headerParams || {});
  // }
  public init(baseURL: string) {
    axiosMain.defaults.baseURL = baseURL;
  }

  //   public setHeader():void {
  //     axiosMain.defaults.headers.common['oauthCode'] = `Bearer ${jwtOauthCode}`;
  //   }
  public setHeader(headerParams: object): void {
    Object.assign(axiosMain.defaults.headers.common, headerParams);
  }

  public removeHeader() {
    axiosMain.defaults.headers.common = {};
  }

  public get(resource: ApiRequest): AxiosPromise<ApiResult> {
    return axiosMain.get(resource.url, resource.config);
  }

  public post(resource: ApiRequest): AxiosPromise<ApiResult> {
    return axiosMain.post(resource.url, resource.data, resource.config);
  }

  public put(resource: ApiRequest): AxiosPromise<ApiResult> {
    return axiosMain.put(resource.url, resource.data, resource.config);
  }

  public delete(resource: ApiRequest): AxiosPromise<ApiResult> {
    return axiosMain.delete(resource.url, resource.config);
  }

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  public customRequest(data: AxiosRequestConfig): AxiosPromise<ApiResult> {
    return axiosMain(data);
  }
}

const apiService = new ApiService();
export { apiService };
