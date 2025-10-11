import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../../../core/models/ingredient.model';
import { ingredientData } from '../../../../assets/ingredients';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private ingredientData$: Observable<Record<string, Ingredient[]>> =
    of(ingredientData);

  getItemIngredients(itemName: string): Observable<Ingredient[]> {
    return this.ingredientData$.pipe(map(data => data[itemName] || []));
  }

  preload(): Observable<Record<string, Ingredient[]>> {
    return this.ingredientData$;
  }
}
