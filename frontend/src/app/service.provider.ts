import { FactoryProvider, inject } from '@angular/core';
import { APP_CONFIG } from './injection.token';
import { CategoryService } from './shared/services/no-bff/category.service';
import { CategoryServiceBFF } from './shared/services/bff/category.service';
import { OrderService } from './shared/services/no-bff/order.service';
import { OrderServiceBFF } from './shared/services/bff/order.service';
import { OrderTrackingService } from './shared/services/no-bff/order-tracking.service';
import { PaymentService } from './shared/services/no-bff/payment.service';
import { PaymentServiceBFF } from './shared/services/bff/payment.service';
import { AllergenService } from './shared/services/no-bff/allergen.service';
import { AllergenServiceBFF } from './shared/services/bff/allergen.service';
import { OrderTrackingServiceBFF } from './shared/services/bff/order-tracking.service';

export const CATEGORY_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'CATEGORY_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(CategoryServiceBFF) : inject(CategoryService);
  },
};

export const ORDER_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'ORDER_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(OrderServiceBFF) : inject(OrderService);
  },
};

export const ORDER_TRACKING_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'ORDER_TRACKING_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff
      ? inject(OrderTrackingServiceBFF)
      : inject(OrderTrackingService);
  },
};

export const PAYMENT_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'PAYMENT_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(PaymentServiceBFF) : inject(PaymentService);
  },
};

export const ALLERGEN_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'ALLERGEN_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(AllergenServiceBFF) : inject(AllergenService);
  },
};
