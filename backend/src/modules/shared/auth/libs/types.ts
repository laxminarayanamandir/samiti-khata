import { Request } from 'express';

export type UserJwtPayload = {
  userId: number;
  role: string;
  organizationId: number | undefined;
  refreshToken?: string;
};

export interface AuthenticatedRequest extends Request {
  user?: UserJwtPayload;
}
