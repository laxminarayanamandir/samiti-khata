/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if (user && !err) return user;

    if (info instanceof TokenExpiredError)
      throw new UnauthorizedException({
        message: 'Access token expired',
        errorCode: 'ERR_TOKEN_EXPIRED',
      });

    if (info?.message === 'No auth token') {
      throw new UnauthorizedException({
        message: 'Access token is missing',
        errorCode: 'ERR_TOKEN_MISSING',
      });
    }

    // 4. Fallback for all other unvalidated/tampered/malformed JWT states
    throw new UnauthorizedException({
      message: err?.message || info?.message || 'Authentication failed',
      errorCode: 'ERR_UNAUTHORIZED',
    });
  }
}
