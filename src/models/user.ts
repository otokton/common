import { AbstractObject } from './abstract-object';
import { Filter } from './filter';
import { Response } from './response';

export interface User<T> extends AbstractObject {
  email: string;
  password?: string;
  role?: string;
  verify?: boolean;
  profile?: T;
  token?: string;
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
