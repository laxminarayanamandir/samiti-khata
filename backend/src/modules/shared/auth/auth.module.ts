import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersModule } from '@shared/users/users.module';
import { JwtAccessTokenStrategy } from './jwt/jwtAccess.strategies';
import { JwtRefreshTokenStrategy } from './jwt/jwtRefresh.strategy';
import { UserSessionModule } from '@shared/user-session/user-session.module';
import { UserOrganizationModule } from '@owner/user-organization/user-organization.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
    JwtModule.register({}),
    UserSessionModule,
    UserOrganizationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
