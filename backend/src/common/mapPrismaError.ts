import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

interface MappedPrismaError {
  status: number;
  message: string;
  errorCode: string;
}

export function mapPrismaError(
  exception: Prisma.PrismaClientKnownRequestError,
): MappedPrismaError {
  switch (exception.code) {
    case 'P2025':
      return {
        status: HttpStatus.NOT_FOUND,
        message:
          (typeof exception.meta?.cause === 'string'
            ? exception.meta.cause
            : undefined) || 'The requested record could not be found.',
        errorCode: 'ERR_RECORD_NOT_FOUND',
      };

    case 'P2002':
      return {
        status: HttpStatus.CONFLICT,
        message: 'A record with these values already exists.',
        errorCode: 'ERR_DUPLICATE_RECORD',
      };

    case 'P2003':
      return {
        status: HttpStatus.BAD_REQUEST,
        message:
          'Database relation constraint violation. Relational entity missing.',
        errorCode: 'ERR_FOREIGN_KEY_VIOLATION',
      };

    default:
      return {
        status: HttpStatus.BAD_REQUEST,
        message: `Database operation failed: ${exception.message}`,
        errorCode: `ERR_PRISMA_${exception.code}`,
      };
  }
}
