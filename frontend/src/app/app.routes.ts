import { Routes } from '@angular/router';
import { ROUTES } from './core/utils/constant';

/*lazy loading*/
export const routes: Routes = [
    { path: ROUTES.landing, loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent) },
    { path: ROUTES.splitPayment, loadComponent: () => import('./features/split-payment/split-payment.component').then(m => m.SplitPaymentComponent) }
];
