import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserJwtPayload } from '../libs/types';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      // extract JWT from cookies instead of Authorization header
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token = null;
          if (request && request.cookies) {
            token = request.cookies['refresh_token'] as string;
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'asdhklas(*^&%%$(*))*&*^&',
      passReqToCallback: true, // pass the request object to the validate method
    });
  }

  // if jwt is valid, this validate method will be called with the decoded payload
  validate(req: Request, payload: UserJwtPayload) {
    const refreshToken = req.cookies?.['refresh_token'] as string;
    if (!refreshToken) throw new UnauthorizedException('Refresh token missing');
    return {
      userId: payload.userId,
      role: payload.role,
      organizationId: payload.organizationId,
      refreshToken,
    };
  }
}
