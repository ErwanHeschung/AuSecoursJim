import { FactoryProvider, inject } from '@angular/core';
import { APP_CONFIG } from './injection.token';
import { CategoryService } from './shared/services/no-bff/category.service';
import { CategoryServiceBFF } from './shared/services/bff/category.service';
import { OrderTrackingService } from './shared/services/no-bff/order-tracking.service';
import { OrderService } from './shared/services/no-bff/order.service';
import { IngredientService } from './shared/services/no-bff/ingredient.service';
import { AllergenService } from './shared/services/no-bff/allergen.service';

export const CATEGORY_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'CATEGORY_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(CategoryServiceBFF) : inject(CategoryService);
  },
};

export const ORDER_TRACKING_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'ORDER_TRACKING_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff
      ? inject(OrderTrackingService)
      : inject(OrderTrackingService);
  },
};

export const ORDER_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'ORDER_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(OrderService) : inject(OrderService);
  },
};

export const INGREDIENT_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'INGREDIENT_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(IngredientService) : inject(IngredientService);
  },
};

export const ALLERGEN_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'ALLERGEN_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(AllergenService) : inject(AllergenService);
  },
};