import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export interface AppConfig {
    useBff: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
    providedIn: 'root',
    factory: () => ({ useBff: environment.useBff })
});