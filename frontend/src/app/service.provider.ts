import { FactoryProvider, inject } from '@angular/core';
import { APP_CONFIG } from './injection.token';
import { CategoryService } from './shared/services/no-bff/category.service';
import { CategoryServiceBFF } from './shared/services/bff/category.service';
import { PaymentServiceBFF } from './shared/services/bff/payment.service';
import { PaymentService } from './shared/services/no-bff/payment.service';

export const CATEGORY_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'CATEGORY_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(CategoryServiceBFF) : inject(CategoryService);
  },
};

export const PAYMENT_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'PAYMENT_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(PaymentServiceBFF) : inject(PaymentService);
  },
};
