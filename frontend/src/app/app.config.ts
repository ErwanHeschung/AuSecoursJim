import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ALLERGEN_SERVICE_PROVIDER,
  CATEGORY_SERVICE_PROVIDER,
  ORDER_SERVICE_PROVIDER,
  ORDER_TRACKING_SERVICE_PROVIDER,
  PAYMENT_SERVICE_PROVIDER,
} from './service.provider';
import { LoggingInterceptor } from './core/interceptors/logging-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
    CATEGORY_SERVICE_PROVIDER,
    ORDER_TRACKING_SERVICE_PROVIDER,
    ORDER_SERVICE_PROVIDER,
    PAYMENT_SERVICE_PROVIDER,
    ALLERGEN_SERVICE_PROVIDER,
  ],
};
