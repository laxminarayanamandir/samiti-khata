import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest, UserJwtPayload } from '../libs/types';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // get the request object from the execution context
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    // if a specific property is requested, return that property from the user object
    if (data) {
      const user = request.user;
      return user ? user[data as keyof UserJwtPayload] : undefined;
    }

    // if not then return the entire user object
    return request.user;
  },
);
