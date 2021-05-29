import * as koa from 'koa';
import { User } from '../user/user';

export abstract class AbstractController {
  getUser(ctx: koa.Context): User {
    return ctx.state.auth ? ctx.state.auth.user : null;
  }

  setCount(ctx: koa.Context, count: number) {
    ctx.append('X-Total-Count', `${count}`);
  }
}
