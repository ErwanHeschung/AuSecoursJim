import { Routes } from '@angular/router';
import { ROUTES } from './core/utils/constant';

/*lazy loading*/
export const routes: Routes = [
    { path: ROUTES.landing, loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent) },
    { path: ROUTES.menu, loadComponent: () => import('./features/menu/menu.component').then(m => m.MenuComponent) },
];
