import { Component, Inject, OnInit } from '@angular/core';
import { ItemComponent } from '../../shared/components/item/item.component';
import { CategoryItemComponent } from '../../shared/components/category-item/category-item.component';
import { OrderType } from '../../core/models/order-type.model';
import { PaymentMethod } from '../../core/models/payment-method.model';
import { Order } from '../../core/models/order.model';
import { OrderStatus } from '../../core/models/order-status.model';
import { ICONS } from '../../core/utils/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Item } from '../../core/models/item.model';
import { Category } from '../../core/models/category.model';
import { PopupComponent } from '../../shared/components/popup/popup.component';
import { MenuItemDetailComponent } from '../menu-item-detail/menu-item-detail.component';
import { FilterAllergensComponent } from '../filter-allergens/filter-allergens.component';
import { Allergen } from '../../core/models/allergen.model';
import { ICategoryService } from '../../shared/models/interfaces/category';

@Component({
  selector: 'app-menu',
  imports: [
    ItemComponent,
    CategoryItemComponent,
    PopupComponent,
    MenuItemDetailComponent,
    FontAwesomeModule,
    FilterAllergensComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  protected ICONS = ICONS;

  protected categories: Category[] = [];
  protected items: Item[] = [];

  protected selectedCategory!: Category;

  protected selectedItem: Item = this.items[0];

  protected selectedAllergens: Allergen[] = [];

  protected filterPopup: boolean = false;

  protected cartPopup: boolean = false;

  protected itemPopup: boolean = false;

  protected order: Order = {
    id: 0,
    status: OrderStatus.IN_PROGRESS,
    type: OrderType.DINE_IN,
    payment: PaymentMethod.KIOSK,
    amount: 20,
    amountSplits: [],
    quantity: 2,
    items: [],
  };

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

  protected onAllergensSelected(allergens: Allergen[]) {
    this.selectedAllergens = allergens;
  }

  protected toggleFilterPopup(): void {
    this.filterPopup = !this.filterPopup;
  }

  protected toggleItemPopup(): void {
    this.itemPopup = !this.itemPopup;
  }

  protected toggleCartPopup(): void {
    this.cartPopup = !this.cartPopup;
  }

  protected switchCategory(category: Category): void {
    this.selectedCategory = category;
    this.setItemByCategoryName(category.name);
  }

  protected openItemDetails(item: Item): void {
    // TODO: Open item details popup
    console.log(item);
    this.selectedItem = item;
    this.toggleItemPopup();
  }

  private setItemByCategoryName(categoryName: string) {
    this.categoryService.getItemsByCategoryName(categoryName).subscribe({
      next: items => {
        this.items = items;
      },
      error: err => {
        console.error('Erreur lors du chargement des items:', err);
      },
    });
  }
}
