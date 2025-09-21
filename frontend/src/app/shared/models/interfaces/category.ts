import { Observable } from 'rxjs';

export interface ICategoryService {
  getAllCategories(): Observable<string[]>;
}
