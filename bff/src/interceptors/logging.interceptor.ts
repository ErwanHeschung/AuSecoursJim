import { HttpService } from '@nestjs/axios';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, OnModuleInit } from '@nestjs/common';
import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  private readonly logger = new Logger('Controller');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const httpMethod = req.method;
    const url = req.url;

    this.logger.log(`Received [${httpMethod}] ${url}`);

    return next.handle();
  }

}


@Injectable()
export class AxiosLoggingInterceptor implements OnModuleInit {
  private readonly logger = new Logger('HttpClient');

  constructor(private readonly httpService: HttpService) { }

  onModuleInit() {
    const axios = this.httpService.axiosRef;

    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      this.logger.log(`Sending ${config.method?.toUpperCase()} request to ${config.url}`);
      return config;
    });
  }
}