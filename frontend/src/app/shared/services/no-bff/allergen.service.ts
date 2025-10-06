import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Allergen } from '../../../core/models/allergen.model';

export interface Dish {
  name: string;
  allergens: string[];
}

export interface AllergenData {
  allergens: Allergen[];
  dishes: Dish[];
}

@Injectable({
  providedIn: 'root',
})
export class AllergenService {
  private allergenData$: Observable<AllergenData>;

  constructor(private http: HttpClient) {
    this.allergenData$ = this.http
      .get<AllergenData>('assets/allergens.json')
      .pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Failed to load allergens data:', error);
          return of({ allergens: [], dishes: [] });
        })
      );
  }

  getAllergens(): Observable<Allergen[]> {
    return this.allergenData$.pipe(map(data => data.allergens));
  }

  getDishes(): Observable<Dish[]> {
    console.log(this.allergenData$.pipe(map(data => data.dishes)));
    return this.allergenData$.pipe(map(data => data.dishes));
  }

  getDishesWithoutAllergens(excluded: string[]): Observable<Dish[]> {
    return this.getDishes().pipe(
      map(dishes =>
        dishes.filter(dish =>
          excluded.every(ex => !dish.allergens.includes(ex))
        )
      )
    );
  }

  preload(): Observable<AllergenData> {
    return this.allergenData$;
  }
}
