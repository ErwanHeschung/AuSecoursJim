import { Observable } from 'rxjs';
import { Category } from '../../../core/models/category.model';
import { Item } from '../../../core/models/item.model';

export interface ICategoryService {
  getAllCategories(): Observable<Category[]>;

  getItemsByCategoryName(categoryName: string): Observable<Item[]>;
}
