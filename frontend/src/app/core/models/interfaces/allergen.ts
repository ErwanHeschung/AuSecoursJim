import { Observable } from 'rxjs';
import { Allergen } from '../allergen.model';

export interface IAllergenService {
  getAllergens(): Observable<Allergen[]>;
}
