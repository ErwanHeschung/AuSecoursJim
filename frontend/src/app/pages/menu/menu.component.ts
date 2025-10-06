import { Component, Inject, OnInit } from '@angular/core';
import { ItemComponent } from '../../shared/components/item/item.component';
import { CategoryItemComponent } from '../../shared/components/category-item/category-item.component';
import { ICONS } from '../../core/utils/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Item } from '../../core/models/item.model';
import { Category } from '../../core/models/category.model';
import { PopupComponent } from '../../shared/components/popup/popup.component';
import { MenuItemDetailComponent } from '../../shared/components/menu-item-detail/menu-item-detail.component';
import { Allergen } from '../../core/models/allergen.model';
import { ICategoryService } from '../../core/models/interfaces/category';
import { FilterAllergensComponent } from '../../shared/components/filter-allergens/filter-allergens.component';
import { FooterComponent } from './components/footer/footer.component';
import { IAllergenService } from '../../core/models/interfaces/allergen';
import { switchMap, map } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [
    ItemComponent,
    CategoryItemComponent,
    PopupComponent,
    MenuItemDetailComponent,
    FontAwesomeModule,
    FilterAllergensComponent,
    FooterComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  protected ICONS = ICONS;

  protected categories: Category[] = [];
  protected items: Item[] = [];

  protected selectedCategory: Category | null = null;

  protected selectedItem: Item = this.items[0];

  protected selectedAllergens: Allergen[] = [];

  protected filterPopup: boolean = false;

  protected itemPopup: boolean = false;

  private allItemsWithAllergens: Item[] = [];


  constructor(
    @Inject('CATEGORY_SERVICE') private categoryService: ICategoryService,
    @Inject('ALLERGEN_SERVICE') private allergenService: IAllergenService,
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: categories => {
        this.categories = categories;
        this.selectedCategory = categories[0];
        this.initializeItems(this.selectedCategory.name);
      },
      error: err => console.error(err),
    });
  }

  public toggleFilterPopup(): void {
    this.filterPopup = !this.filterPopup;
  }

  public toggleItemPopup(): void {
    this.itemPopup = !this.itemPopup;
  }

  public openItemDetails(item: Item): void {
    // TODO: Open item details popup
    this.selectedItem = item;
    this.toggleItemPopup();
  }

  private initializeItems(categoryName: string) {
    this.categoryService.getItemsByCategoryName(categoryName).pipe(
      switchMap((items: Item[]) =>
        this.allergenService.getDishesWithAllergens().pipe(
          map((dishesWithAllergens: string[][]) => {
            const dishMap = new Map<string, string[]>(
              dishesWithAllergens.map(d => [d[0], d.slice(1)])
            );

            return items.map(item => ({
              ...item,
              allergens: dishMap.get(item.fullName) || []
            }));
          })
        )
      )
    ).subscribe({
      next: (initializedItems: Item[]) => {
        this.allItemsWithAllergens = initializedItems;

        this.applyFilters();
      },
      error: err => console.error('Erreur lors de l’initialisation des items :', err)
    });
  }

  private applyFilters() {
    const excludedIds = this.selectedAllergens.map(a => a.id);

    this.items = this.allItemsWithAllergens.filter(item =>
      excludedIds.every(ex => !(item.allergens || []).includes(ex))
    );

    console.log('Items filtrés selon allergènes et catégorie :', this.items);
  }

  public onAllergensSelected(allergens: Allergen[]): void {
    this.selectedAllergens = allergens;

    this.applyFilters();
  }

  public switchCategory(category: Category): void {
    this.selectedCategory = category;
    this.initializeItems(category.name);
  }
}
