import { AbstractObject } from '../models/abstract-object';

export interface User extends AbstractObject {
  email: string;
  password?: string;
  role?: string;
  verify?: boolean;
  profile?: any;
  token?: string;
}
