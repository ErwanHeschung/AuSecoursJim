import { FactoryProvider, inject } from '@angular/core';
import { APP_CONFIG } from './injection.token';
import { CategoryService } from './shared/services/no-bff/category.service';
import { CategoryServiceBFF } from './shared/services/bff/category.service';

export const CATEGORY_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'CATEGORY_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(CategoryServiceBFF) : inject(CategoryService);
  },
};
