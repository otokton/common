import { Response } from '../models';
import { User } from './user';

export interface UserResponse extends Response<User> {}
