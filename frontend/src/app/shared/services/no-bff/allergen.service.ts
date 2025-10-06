import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Allergen } from '../../../core/models/allergen.model';
import { IAllergenService } from '../../../core/models/interfaces/allergen';
import { allergenData } from '../../../../assets/allergens';

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
export class AllergenService implements IAllergenService {
  private allergenData$: Observable<AllergenData> = of(allergenData);


  getAllergens(): Observable<Allergen[]> {
    return this.allergenData$.pipe(map(data => data.allergens));
  }

  getDishes(): Observable<Dish[]> {
    return this.allergenData$.pipe(map(data => data.dishes));
  }

  getDishesWithAllergens(): Observable<string[][]> {
    return this.getDishes().pipe(
      map(dishes =>
        dishes
          .map(dish => [dish.name, ...dish.allergens])
      )
    );
  }

  preload(): Observable<AllergenData> {
    return this.allergenData$;
  }
}
