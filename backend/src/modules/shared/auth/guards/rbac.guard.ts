import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from '../decorators/rbac.decorator';
import { AuthenticatedRequest } from '../libs/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // extract the required role from the decorator
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // if no roles required, pass true
    if (!requiredRoles) return true;

    // get the user from jwt
    const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!user || !user.role)
      throw new ForbiddenException(
        'Access Denied. The required role is missing.',
      );

    const hasRole = requiredRoles.includes(user.role as UserRole);
    // console.log({ user, requiredRoles, hasRole });

    if (!hasRole)
      throw new ForbiddenException(
        'Access Denied. You do not have the required permission to access this resource.',
      );

    return true;
  }
}
