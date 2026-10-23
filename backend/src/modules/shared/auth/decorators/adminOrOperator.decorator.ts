import { UserRole } from '@prisma/client';
import { Roles } from './rbac.decorator';
import { RolesGuard } from '../guards/rbac.guard';
import { JwtAuthGuard } from '../guards/jwtauth.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function RequireAdminOrOperator() {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(UserRole.ADMIN, UserRole.OPERATOR),
  );
}
