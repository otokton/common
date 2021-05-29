import { User } from './user';
import { UserFilter } from './user-filter';

export interface UserState<T> {
  users: User[];
  user: User;
  filter: UserFilter;
  count: number;
  total: number;
}
