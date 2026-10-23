/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { mapPrismaError } from './mapPrismaError';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let errorCode = 'ERR_INTERNAL_SERVER';
    let errorDetails: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorCode = `ERR_${HttpStatus[status] || 'UNKNOWN'}`;
      const resBody = exception.getResponse();

      if (typeof resBody === 'object' && resBody !== null) {
        if ('errorCode' in resBody) errorCode = (resBody as any).errorCode;
        if ('errors' in resBody) {
          errorDetails = (resBody as any).errors;
          message = (resBody as any).message || 'Validation Failed';
          errorCode = `ERR_VALIDATION_FAILED`;
        } else {
          message = (resBody as any).message;
        }
      } else if (typeof resBody === 'string') {
        message = resBody;
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = mapPrismaError(exception);
      status = prismaError.status;
      message = prismaError.message;
      errorCode = prismaError.errorCode;
    } else if (exception instanceof Error) {
      message = exception.message;
      errorCode = 'ERR_UNHANDLED_RUNTIME';
    }

    response.status(status).json({
      success: false,
      message,
      errorCode,
      ...(errorDetails && { error: errorDetails }),
    });
  }
}
