import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Pagination, paginationToUri } from '../models/pagination';

export class AxiosService {
  apiClient: AxiosInstance;

  constructor(apiUrl: string) {
    this.apiClient = axios.create({
      baseURL: apiUrl,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: ''
      },
      timeout: 10000
    });
  }

  errorInterceptor(handleError: Function) {
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        handleError.bind;
        return Promise.reject(error);
      }
    );
  }

  async getAll<T>(uri: string, pagination?: Pagination): Promise<T[]> {
    return (
      await this.apiClient.get(
        `${uri}${pagination ? paginationToUri(pagination) : ''}`
      )
    ).data;
  }

  async get<T>(uri: string, id: any): Promise<T> {
    return (await this.apiClient.get(`${uri}/${id}`)).data;
  }

  async create<T>(uri: string, data: T): Promise<T> {
    return (await this.apiClient.post(uri, data)).data;
  }

  async update<T>(uri: string, data: T): Promise<AxiosResponse> {
    return await this.apiClient.put(uri, data);
  }

  async delete(uri: string, id: any): Promise<AxiosResponse> {
    return this.apiClient.delete(`${uri}/${id}`);
  }
}
