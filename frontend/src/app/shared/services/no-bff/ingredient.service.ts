import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Ingredient } from '../../../core/models/ingredient.model';
import { IIngredientService } from '../../../core/models/interfaces/ingredient';
import { ingredientData } from '../../../../assets/ingredients';

@Injectable({
  providedIn: 'root',
})
export class IngredientService implements IIngredientService {
  private ingredientData$: Observable<Record<string, Ingredient[]>> =
    of(ingredientData);

  getItemIngredients(itemName: string): Observable<Ingredient[]> {
    return this.ingredientData$.pipe(map(data => data[itemName] || []));
  }

  preload(): Observable<Record<string, Ingredient[]>> {
    return this.ingredientData$;
  }
}
