/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // console.log('The data is: ', { data });
        // If service returns an object containing pagination details
        let meta: any = undefined;
        let payload = data;

        if (
          data &&
          typeof data === 'object' &&
          'meta' in data &&
          'results' in data
        ) {
          meta = data.meta;
          payload = data.results;
        }

        // console.log({
        //   success: true,
        //   message: data?.message || 'Operation successful',
        //   data: payload ?? null,
        //   ...(meta && { meta }),
        // });

        return {
          success: true,
          message: data?.message || 'Operation successful',
          data: payload ?? null,
          ...(meta && { meta }), // Appends meta block natively only if pagination exists
        };
      }),
    );
  }
}
