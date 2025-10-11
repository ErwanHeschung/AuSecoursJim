import { Injectable } from '@angular/core';
import { MenuService } from './gateway-calls/menu.service';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { ICategoryService } from '../../../core/models/interfaces/category';
import { Category } from '../../../core/models/category.model';
import { Item } from '../../../core/models/item.model';
import { IngredientService } from './ingredient.service';
import { AllergenService } from './allergen.service';
import { Allergen } from '../../../core/models/allergen.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements ICategoryService {
  constructor(
    private menuService: MenuService,
    private ingredientService: IngredientService,
    private allergenService: AllergenService
  ) {}

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
    return this.menuService.getAllMenus().pipe(
      map(menus => menus.filter(menu => menu.category === category)),
      switchMap(items =>
        this.allergenService.getDishes().pipe(
          switchMap(dishes => {
            const requests = items.map(item => {
              const dish = dishes.find(d => d.name === item.fullName);
              const allergens: Allergen[] = (dish?.allergens || []).filter(
                a => !!a
              );

              return this.ingredientService
                .getItemIngredients(item.fullName)
                .pipe(
                  map(ingredients => ({
                    ...item,
                    ingredients,
                    allergens,
                  }))
                );
            });

            return forkJoin(requests);
          })
        )
      )
    );
  }
}
