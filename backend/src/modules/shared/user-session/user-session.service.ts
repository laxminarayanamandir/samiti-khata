import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserSessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, refreshToken: string, expiresAt: Date) {
    return this.prisma.session.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt,
      },
    });
  }

  async findLastActiveSession(userId: number) {
    const sessions = await this.prisma.session.findMany({
      where: {
        userId,
        refreshedAt: null,
      },
    });

    return sessions[sessions.length - 1];
  }

  async setSessionRefreshed(sessionId: number, tx: Prisma.TransactionClient) {
    return await tx.session.update({
      where: {
        id: sessionId,
        refreshedAt: null, // only update if the session is not already refreshed - prevent race conditions
      },
      data: {
        refreshedAt: new Date(),
      },
    });
  }

  async saveRefreshToken(
    userId: number,
    refreshToken: string,
    expiresAt: Date,
    prismaClient: Prisma.TransactionClient,
  ) {
    return await prismaClient.session.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt,
      },
    });
  }

  async markSessionRefreshedAndSaveNewToken(
    sessionId: number,
    userId: number,
    refreshToken: string,
    expiresAt: Date,
  ) {
    return await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        await this.setSessionRefreshed(sessionId, tx);
        await this.saveRefreshToken(userId, refreshToken, expiresAt, tx);
      },
    );
  }

  async findByToken(token: string) {
    return this.prisma.session.findUnique({
      where: { token },
    });
  }

  async deleteById(id: number) {
    return this.prisma.session.delete({
      where: { id },
    });
  }

  async deleteByToken(token: string) {
    return this.prisma.session.delete({
      where: { token },
    });
  }

  async deleteExpiredSessions(userId: number) {
    return this.prisma.session.deleteMany({
      where: {
        userId,
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
