import { Routes } from '@angular/router';
import { ROUTES } from './core/utils/constant';

/*lazy loading*/
export const routes: Routes = [
  {
    path: ROUTES.landing,
    loadComponent: () =>
      import('./features/landing/landing.component').then(
        m => m.LandingComponent
      ),
  },
  {
    path: ROUTES.paymentSelection,
    loadComponent: () =>
      import('./features/payment-selection/payment-selection.component').then(
        m => m.PaymentSelectionComponent
      ),
  },
  {
    path: ROUTES.orderTracking,
    loadComponent: () =>
      import('./features/order-tracking/order-tracking.component').then(
        m => m.OrderTrackingComponent
      ),
  },
  {
    path: ROUTES.splitPayment,
    loadComponent: () =>
      import('./features/split-payment/split-payment.component').then(
        m => m.SplitPaymentComponent
      ),
  },
  {
    path: ROUTES.orderTrackingQRcode,
    loadComponent: () =>
      import(
        './features/order-tracking-qrcode/order-tracking-qrcode.component'
      ).then(m => m.OrderTrackingQRcodeComponent),
  },
  {
    path: ROUTES.menu,
    loadComponent: () =>
      import('./features/menu/menu.component').then(m => m.MenuComponent),
  },
];
