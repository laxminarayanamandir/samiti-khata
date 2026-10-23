import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@shared/users';
import type { UserJwtPayload } from './libs/types';
import { LoginDto, SignupDto } from './libs/auth.dto';
import { UserSessionService } from '@shared/user-session';
import { UserOrganizationService } from '@owner/user-organization';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userSessionService: UserSessionService,
    private readonly userOrganizationService: UserOrganizationService,
  ) {}

  async signup(signupDto: SignupDto) {
    return await this.usersService.createUser(signupDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userOrganizationRelation =
      await this.userOrganizationService.getByUserId(user.id);

    // owner doesn't require organization approval, but other roles do
    if (!userOrganizationRelation && user.role !== 'OWNER')
      throw new ForbiddenException(
        'User acount is not approved. Please contact the admin.',
      );

    const { accessToken, refreshToken } = await this.generateToken({
      userId: user.id,
      role: user.role,
      organizationId: userOrganizationRelation?.organizationId,
    });

    const expiryDuration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await this.userSessionService.create(user.id, refreshToken, expiryDuration);

    return { accessToken, refreshToken };
  }

  private async generateToken(payload: UserJwtPayload) {
    const jwtPayload = {
      userId: payload.userId,
      role: payload.role,
      organizationId: payload.organizationId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_ACCESS_SECRET || 'ASDHL(!*!%%(!@*(^&@',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_REFRESH_SECRET || 'asdhklas(*^&%%$(*))*&*^&',
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshToken(user: UserJwtPayload) {
    if (!user.refreshToken) throw new BadRequestException('Token not found');
    const session = await this.userSessionService.findByToken(
      user.refreshToken,
    );
    // console.log('user is', user);
    // console.log('session is', session);

    if (!session || session.expiresAt < new Date()) {
      // console.log('checking');
      await this.userSessionService.deleteExpiredSessions(user.userId);
      // console.log("Checking for session and it's expiry", session);
      throw new UnauthorizedException('Session expired. Please log in again.');
    }

    // session already refreshed. using old refresh token. may be replay attack or legitimate refresh attempt within grace period
    if (session.refreshedAt) {
      const refreshDuration =
        (new Date().getTime() - session.refreshedAt.getTime()) / (1000 * 60); // in minutes
      // console.log('Session has been refreshed already');

      // provide a grace period of 60 seconds to allow for legitimate refresh attempts, but prevent replay attacks
      if (refreshDuration > 1) {
        await this.userSessionService.deleteById(session.id);
        // console.log('Session refreshed duration > 1 minutes');
        throw new UnauthorizedException(
          'Session expried. Please log in again.',
        );
      }
      // return new tokens without updating the session to allow for legitimate refresh attempts within the grace period
      const latestSession = await this.userSessionService.findLastActiveSession(
        user.userId,
      );

      const tokens = await this.generateToken(user);
      return {
        accessToken: tokens.accessToken,
        refreshToken: latestSession.token,
      };
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateToken(user);

    await this.userSessionService.markSessionRefreshedAndSaveNewToken(
      session.id,
      user.userId,
      newRefreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    );

    return { accessToken, refreshToken: newRefreshToken };
  }

  async getMe(userId: number) {
    return this.usersService.getNameAndEmailById(userId);
  }
}
