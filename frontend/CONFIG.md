# Angular Project Configuration – BFF / Front Swap

## 1. Goal

Allow Angular services to **dynamically switch** between:

* a front-only version (simulated on the client)
* a BFF (backend-for-frontend) version

…without modifying the components themselves.

---

## How it works

### 2. Environments

Two main environment files are set up:

* `src/environments/environment.ts` – front-only
* `src/environments/environment.bff.ts` – BFF

File replacements are configured in `angular.json`:

```json
"fileReplacements": [
  {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.bff.ts"
  }
]
```

---

### 3. Injection Token (`injection.token.ts`)

```ts
import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface AppConfig {
  useBff: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({ useBff: environment.useBff })
});
```

* Used to inject the global config (`useBff`) into service factories.

---

### 4. Service Interface

```ts
export interface IDataService {
  getData(): Observable<{ id: number; name: string }[]>;
}
```

* Both front and BFF services implement this interface.

---

### 5. Front / BFF Services

```ts
@Injectable({ providedIn: 'root' })
export class ExampleServiceFront implements IDataService {
  getData(): Observable<{ id: number; name: string }[]> {
    return of([{ id: 1, name: 'Front' }]);
  }
}

@Injectable({ providedIn: 'root' })
export class ExampleServiceBff implements IDataService {
  constructor(private http: HttpClient) {}
  getData(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>('/bff/data');
  }
}
```

---

### 6. Dynamic Factory Provider

```ts
export const DATA_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'DATA_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(DataServiceBff) : inject(DataServiceFront);
  }
};
```

* Determines which service to inject depending on the `useBff` flag.

---

### 7. Standalone `appConfig` Registration

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    DATA_SERVICE_PROVIDER
  ]
};
```

---

### 8. Component Usage

```ts
constructor(@Inject('DATA_SERVICE') private dataService: IDataService) {}

ngOnInit() {
  this.dataService.getData().subscribe(console.log);
}
```

* Components **do not care** if service is front or BFF.

---

### 9. Angular Commands

* **Front-only development**:

```bash
npm start
```

* **BFF-enabled development**:

```bash
npm run start:bff
```

---

## 🛠️ How to Add New Services

1. **Define a new interface** for the service if it doesn’t exist:

```ts
export interface IAnotherService {
  fetchItems(): Observable<Item[]>;
}
```

2. **Implement both Front and BFF versions**:

```ts
@Injectable({ providedIn: 'root' })
export class AnotherServiceFront implements IAnotherService {
  fetchItems(): Observable<Item[]> { return of([...]); }
}

@Injectable({ providedIn: 'root' })
export class AnotherServiceBff implements IAnotherService {
  constructor(private http: HttpClient) {}
  fetchItems(): Observable<Item[]> { return this.http.get<Item[]>('/bff/items'); }
}
```

3. **Create a dynamic provider**:

```ts
export const ANOTHER_SERVICE_PROVIDER: FactoryProvider = {
  provide: 'ANOTHER_SERVICE',
  useFactory: () => {
    const config = inject(APP_CONFIG);
    return config.useBff ? inject(AnotherServiceBff) : inject(AnotherServiceFront);
  }
};
```

4. **Register the provider** in `appConfig.providers`:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    ...existingProviders,
    ANOTHER_SERVICE_PROVIDER
  ]
};
```

5. **Inject into components**:

```ts
constructor(@Inject('ANOTHER_SERVICE') private anotherService: IAnotherService) {}
```

* No component changes are needed if you follow the interface.
