import { Observable } from 'rxjs';
import { Ingredient } from '../ingredient.model';

export interface IIngredientService {
  getItemIngredients(itemName: string): Observable<Ingredient[]>;
}
