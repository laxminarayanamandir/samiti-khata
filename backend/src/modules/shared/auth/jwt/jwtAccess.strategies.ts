import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { Request } from 'express';
import { UserJwtPayload } from '../libs/types';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UsersService) {
    super({
      // extract JWT from cookies instead of Authorization header
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token = null;
          if (request && request.cookies) {
            token = request.cookies['access_token'] as string;
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET || 'ASDHL(!*!%%(!@*(^&@',
    });
  }

  // if jwt is valid, this validate method will be called with the decoded payload
  async validate(payload: UserJwtPayload) {
    const user = await this.userService.findById(payload.userId);
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }
    return payload;
  }
}
