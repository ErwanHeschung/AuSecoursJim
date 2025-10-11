import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Allergen } from '../../../core/models/allergen.model';
import { IAllergenService } from '../../../core/models/interfaces/allergen';
import { allergenData } from '../../../../assets/allergens';

export interface Dish {
  name: string;
  allergens: Allergen[];
}

export interface AllergenData {
  allergens: Allergen[];
  dishes: Dish[];
}

@Injectable({
  providedIn: 'root',
})
export class AllergenService implements IAllergenService {
  private allergenData$: Observable<AllergenData> = of(allergenData).pipe(
    map(data => ({
      ...data,
      dishes: data.dishes.map(dish => ({
        ...dish,
        allergens: dish.allergens.map(
          name => data.allergens.find(a => a.name === name)!
        ),
      })),
    }))
  );

  getAllergens(): Observable<Allergen[]> {
    return this.allergenData$.pipe(map(data => data.allergens));
  }

  getDishes(): Observable<Dish[]> {
    return this.allergenData$.pipe(map(data => data.dishes));
  }

  getDishesWithAllergens(): Observable<string[][]> {
    return this.getDishes().pipe(
      map(dishes =>
        dishes.map(dish => [dish.name, ...dish.allergens.map(a => a.name)])
      )
    );
  }

  preload(): Observable<AllergenData> {
    return this.allergenData$;
  }
}
