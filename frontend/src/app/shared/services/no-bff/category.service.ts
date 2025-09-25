import { Injectable } from '@angular/core';
import { MenuService } from './gateway-calls/menu.service';
import { map, Observable } from 'rxjs';
import { ICategoryService } from '../../models/interfaces/category';
import { Category } from '../../../core/models/category.model';
import { Item } from '../../../core/models/item.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements ICategoryService {
  constructor(public menuService: MenuService) {}

  public getAllCategories(): Observable<Category[]> {
    return this.menuService.getAllMenus().pipe(
      map(menus => {
        const categoriesMap = new Map<string, string>();
        menus.forEach(menu => {
          if (!categoriesMap.has(menu.category)) {
            categoriesMap.set(menu.category, menu.image);
          }
        });

        return Array.from(categoriesMap.entries()).map(([category, image]) => ({
          name: category,
          image,
        }));
      })
    );
  }

  public getItemsByCategoryName(category: string): Observable<Item[]> {
    return this.menuService
      .getAllMenus()
      .pipe(map(menus => menus.filter(menu => menu.category === category)));
  }
}
