import { Injectable } from '@angular/core';
import { MenuService } from './gateway-calls/menu.service';
import { map, Observable } from 'rxjs';
import { ICategoryService } from '../../models/interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements ICategoryService {
  constructor(public menuService: MenuService) {}

  public getAllCategories(): Observable<string[]> {
    return this.menuService
      .getAllMenus()
      .pipe(
        map(menus => Array.from(new Set(menus.map(menu => menu.category))))
      );
  }

  public getItemsByCategory(category: string): Observable<any[]> {
    return this.menuService
      .getAllMenus()
      .pipe(map(menus => menus.filter(menu => menu.category === category)));
  }
}
