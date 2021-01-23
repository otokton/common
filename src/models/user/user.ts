import { Filter } from '../filter/filter';
import { Response } from '../response/response';

export interface User<T> {
  email: string;
  password?: string;
  role?: string;
  verify?: boolean;
  profile?: T;
  token?: string;
  _id?: string;
  updatedDate?: Date;
  createdDate?: Date;
}

export interface UserFilter extends Filter {}

export interface UserResponse<T> extends Response<User<T>> {}

export interface UserState<T> {
  users: User<T>[];
  user: User<T>;
  filter: UserFilter;
  count: number;
  total: number;
}
