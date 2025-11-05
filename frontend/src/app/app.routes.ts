import { Routes } from '@angular/router';
import { ROUTES } from './core/utils/constant';

/*lazy loading*/
export const routes: Routes = [
  {
    path: ROUTES.landing,
    loadComponent: () =>
      import('./pages/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: ROUTES.paymentSelection,
    loadComponent: () =>
      import('./pages/payment-selection/payment-selection.component').then(
        m => m.PaymentSelectionComponent
      ),
  },
  {
    path: ROUTES.orderTracking,
    loadComponent: () =>
      import('./pages/order-tracking/order-tracking.component').then(
        m => m.OrderTrackingComponent
      ),
  },
  {
    path: ROUTES.splitPayment,
    loadComponent: () =>
      import('./pages/split-payment/split-payment.component').then(
        m => m.SplitPaymentComponent
      ),
  },
  {
    path: ROUTES.orderTrackingQRcode,
    loadComponent: () =>
      import(
        './pages/order-tracking-qrcode/order-tracking-qrcode.component'
      ).then(m => m.OrderTrackingQRcodeComponent),
  },
  {
    path: ROUTES.menu,
    loadComponent: () =>
      import('./pages/menu/menu.component').then(m => m.MenuComponent),
  },
  {
    path: ROUTES.payment,
    loadComponent: () =>
      import('./pages/payment/payment.component').then(m => m.PaymentComponent),
  },
  {
    path: ROUTES.groupItemSelection,
    loadComponent: () =>
      import(
        './pages/group-item-selection/group-item-selection.component'
      ).then(m => m.GroupSelectionComponent),
  },
];
