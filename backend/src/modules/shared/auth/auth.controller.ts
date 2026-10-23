import { type Response } from 'express';
import { UserRole } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/rbac.guard';
import { type UserJwtPayload } from './libs/types';
import { Roles } from './decorators/rbac.decorator';
import { JwtAuthGuard } from './guards/jwtauth.guard';
import { LoginDto, SignupDto } from './libs/auth.dto';
import { GetUser } from './decorators/getUser.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  test() {
    return { message: 'Auth module is working!' };
  }

  @Post('signup')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  @HttpCode(201)
  async signup(@Body() signupDto: SignupDto) {
    const result = await this.authService.signup(signupDto);
    return result;
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginDto);

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 30 * 60 * 1000, // 30 minutes
    });

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/v2/auth/refresh',
    });

    return { message: 'Login successful' };
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
    return { message: 'Logout successful' };
  }

  // protected route to get user profile
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUser() user: UserJwtPayload) {
    const searchedUser = await this.authService.getMe(user.userId);
    if (!searchedUser) throw new NotFoundException('User not found');
    return {
      name: searchedUser.fullName,
      email: searchedUser.email,
      avatar: '',
      userId: user.userId,
      role: user.role,
      organizationId: user.organizationId,
    };
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshToken(
    @GetUser() user: UserJwtPayload,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.refreshToken(user);

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 20 * 60 * 1000, // 15 minutes
    });

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/v2/auth/refresh',
    });

    return { message: 'Refresh successful' };
  }
}
