import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Ingredient } from '../../../core/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private ingredientData$: Observable<Record<string, Ingredient[]>>;

  constructor(private http: HttpClient) {
    this.ingredientData$ = this.http
      .get<Record<string, Ingredient[]>>('assets/ingredients.json')
      .pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Failed to load ingredients data:', error);
          return of({});
        })
      );
  }

  getIngredients(itemName: string): Observable<Ingredient[]> {
    return this.ingredientData$.pipe(map(data => data[itemName] || []));
  }

  preload(): Observable<Record<string, Ingredient[]>> {
    return this.ingredientData$;
  }
}
