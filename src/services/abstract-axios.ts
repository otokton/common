import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AbstractObject } from '../models/abstract-object';
import { By } from '../models/filter';
import { Pagination, paginationToUri } from '../models/pagination';
import { Response } from '../models/response';

export class AxiosService {
  private apiClient: AxiosInstance;
  private baseURL: string;

  constructor(apiUrl: string, bearer?: string) {
    this.baseURL = apiUrl;
    this.apiClient = axios.create({
      baseURL: this.baseURL,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: bearer ? bearer : ''
      },
      timeout: 10000
    });
  }

  async getAll<T>(uri: string, pagination?: Pagination): Promise<Response<T>> {
    return await this.apiClient
      .get(`${uri}${pagination ? paginationToUri(pagination) : ''}`)
      .then((response) => {
        return {
          total: response.headers[`x-total-count`],
          data: response.data
        } as Response<T>;
      });
  }

  async getBy<T>(
    uri: string,
    by: By,
    pagination?: Pagination
  ): Promise<Response<T>> {
    return this.getAll(
      `${uri}/${Object.keys(by)[0]}/${Object.values(by)[0]}`,
      pagination
    );
  }

  async get<T>(uri: string, id: any): Promise<T> {
    return (await this.apiClient.get(`${uri}/${id}`)).data;
  }

  async create<T>(uri: string, data: T): Promise<T> {
    return (await this.apiClient.post(uri, data)).data;
  }

  async update<T>(uri: string, id: any, data: T): Promise<T> {
    return await this.apiClient.put(`${uri}/${id}`, data);
  }

  async delete(uri: string, id: any): Promise<AxiosResponse> {
    return this.apiClient.delete(`${uri}/${id}`);
  }

  async createOrUpdate<T>(uri: string, data: AbstractObject): Promise<T> {
    if (data._id) {
      return this.update<T>(uri, data._id, data as T);
    }
    return this.create<T>(uri, data as T);
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

  get baseUrl(): string {
    return this.baseURL;
  }
}
