import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggintInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // tslint:disable-next-line:no-console
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => {
        // tslint:disable-next-line:no-console
        console.log(`After... ${Date.now() - now} ms`)
      }));
  }
}
