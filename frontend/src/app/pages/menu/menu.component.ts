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

  constructor(
    @Inject('CATEGORY_SERVICE') private categoryService: ICategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: categories => {
        this.categories = categories;
        this.selectedCategory = categories[0];
        this.setItemByCategoryName(this.selectedCategory.name);
      },
      error: err => console.error(err),
    });
  }

  public onAllergensSelected(allergens: Allergen[]) {
    this.selectedAllergens = allergens;
  }

  public toggleFilterPopup(): void {
    this.filterPopup = !this.filterPopup;
  }

  public toggleItemPopup(): void {
    this.itemPopup = !this.itemPopup;
  }

  public switchCategory(category: Category): void {
    this.selectedCategory = category;
    this.setItemByCategoryName(category.name);
  }

  public openItemDetails(item: Item): void {
    // TODO: Open item details popup
    console.log(item);
    this.selectedItem = item;
    this.toggleItemPopup();
  }

  private setItemByCategoryName(categoryName: string) {
    this.categoryService.getItemsByCategoryName(categoryName).subscribe({
      next: items => {
        console.log(items);
        this.items = items;
      },
      error: err => {
        console.error('Erreur lors du chargement des items:', err);
      },
    });
  }
}
