import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ICategoryService } from '../../../core/models/interfaces/category';
import { Category } from '../../../core/models/category.model';
import { Item } from '../../../core/models/item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryServiceBFF implements ICategoryService {
  private apiUrl: string = environment.apiUrl + '/category';

  constructor(private http: HttpClient) { }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

  public getItemsByCategoryName(category: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/${category}/items`);
  }
}
