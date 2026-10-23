import { ActivityLog } from '@prisma/client';

export type TActivityLog = Omit<ActivityLog, 'id' | 'createdAt'>;
export type LogInfo = {
  description: string;
  organizationId: number;
  userId: number;
};
