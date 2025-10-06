import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {
  CATEGORY_SERVICE_PROVIDER,
  ORDER_SERVICE_PROVIDER,
  ORDER_TRACKING_SERVICE_PROVIDER,
  INGREDIENT_SERVICE_PROVIDER,
  ALLERGEN_SERVICE_PROVIDER,
} from './service.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    CATEGORY_SERVICE_PROVIDER,
    ORDER_TRACKING_SERVICE_PROVIDER,
    ORDER_SERVICE_PROVIDER,
    INGREDIENT_SERVICE_PROVIDER,
    ALLERGEN_SERVICE_PROVIDER
  ],
};
