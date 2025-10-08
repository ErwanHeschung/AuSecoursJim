import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  private readonly logger = new Logger('Controller');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const httpMethod = req.method;
    const url = req.url;
    // const controllerName = context.getClass().name;
    // const methodName = context.getHandler().name;

    this.logger.log(`Received [${httpMethod}] ${url}`);

    return next.handle();
  }

}
