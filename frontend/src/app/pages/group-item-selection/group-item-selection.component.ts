import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaymentLayoutComponent } from '../../layouts/payment-layout/payment-layout.component';
import { BasketService } from '../../shared/services/basket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { ICONS } from '../../core/utils/icon';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { GroupItemComponent } from '../../shared/components/group-item/group-item.component';
import { Item } from '../../core/models/item.model';
import { MenuItemDetailComponent } from '../../shared/components/menu-item-detail/menu-item-detail.component';
import { PopupComponent } from '../../shared/components/popup/popup.component';

@Component({
  selector: 'app-group-item-selection',
  standalone: true,
  templateUrl: './group-item-selection.component.html',
  styleUrls: ['./group-item-selection.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PaymentLayoutComponent,
    GroupItemComponent,
    MenuItemDetailComponent,
    PopupComponent,
  ],
})
export class GroupSelectionComponent implements OnDestroy {
  public arrowLeft: IconDefinition = ICONS['arrowLeft'];
  public arrowRight: IconDefinition = ICONS['arrowRight'];
  public group: IconDefinition = ICONS['group'];
  protected itemPopup: boolean = false;

  protected groupId: string = 'group123';
  protected nbPersons: number = 3;
  protected nbMenu: number = 0;

  // Mock basket item -> To be removed
  mock: Item = {
    _id: '1',
    shortName: 'Sample Item',
    fullName: 'Mock item full name',
    image: 'burger.png',
    price: 10.0,
    category: 'Food',
  };

  items: Item[] = [
    {
      ...this.mock,
      _id: '1',
      shortName: 'Starter 1',
      fullName: 'Starter 1',
      image: 'burger.png',
      category: 'starter',
    },
    {
      ...this.mock,
      _id: '2',
      shortName: 'Starter 2',
      fullName: 'Starter 2',
      image: 'burger.png',
      category: 'starter',
    },
    {
      ...this.mock,
      _id: '3',
      shortName: 'Starter 3',
      fullName: 'Starter 3',
      image: 'burger.png',
      category: 'starter',
    },

    {
      ...this.mock,
      _id: '4',
      shortName: 'Main 1',
      fullName: 'Main 1',
      image: 'burger.png',
      category: 'main',
    },
    {
      ...this.mock,
      _id: '5',
      shortName: 'Main 2',
      fullName: 'Main 2',
      image: 'burger.png',
      category: 'main',
    },
    {
      ...this.mock,
      _id: '6',
      shortName: 'Main 3',
      fullName: 'Main 3',
      image: 'burger.png',
      category: 'main',
    },

    {
      ...this.mock,
      _id: '7',
      shortName: 'Dessert 1',
      fullName: 'Dessert 1',
      image: 'burger.png',
      category: 'dessert',
    },
    {
      ...this.mock,
      _id: '8',
      shortName: 'Dessert 2',
      fullName: 'Dessert 2',
      image: 'burger.png',
      category: 'dessert',
    },
    {
      ...this.mock,
      _id: '9',
      shortName: 'Dessert 3',
      fullName: 'Dessert 3',
      image: 'burger.png',
      category: 'dessert',
    },
  ];

  protected selectedItem: Item = this.items[0];

  constructor(
    private basketService: BasketService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.basketService.setIsGroupOrder(true);
    this.basketService.setGroupLimit(this.nbPersons);
    this.basketSub = this.basketService.basket$.subscribe(() => {
      this.computeNbMenu();
    });
    this.computeNbMenu();
  }

  private basketSub?: Subscription;

  itemsByCategory(category: 'starter' | 'main' | 'dessert'): Item[] {
    return this.items.filter(i => i.category === category);
  }

  selectionCount(category?: 'starter' | 'main' | 'dessert'): number {
    if (category) {
      return this.itemsByCategory(category).reduce(
        (s, it) => s + this.basketService.getItemQuantity(it._id),
        0
      );
    }
    return this.items.reduce(
      (s, it) => s + this.basketService.getItemQuantity(it._id),
      0
    );
  }

  onIncrement(item: Item): void {
    const category = item.category as 'starter' | 'main' | 'dessert';
    const categoryCount = this.selectionCount(category);
    const perItemMax = this.nbPersons;
    const current = this.getQuantity(item);
    if (current >= perItemMax) {
      return;
    }
    if (categoryCount >= this.nbPersons) {
      return;
    }
    const toAdd = { ...item, quantity: 1 } as any;
    this.basketService.addItem(toAdd);
    this.computeNbMenu();
  }

  onDecrement(item: Item): void {
    const current = this.getQuantity(item);
    if (current > 0) {
      this.basketService.updateItemQuantity(item._id, current - 1);
      this.computeNbMenu();
    }
  }

  computeNbMenu(): void {
    const starters = this.selectionCount('starter');
    const mains = this.selectionCount('main');
    const desserts = this.selectionCount('dessert');
    this.nbMenu = Math.min(starters, mains, desserts);
  }

  getQuantity(item: Item): number {
    return this.basketService.getItemQuantity(item._id);
  }

  goNext(): void {}

  ngOnDestroy(): void {
    if (this.basketSub) this.basketSub.unsubscribe();
  }

  public toggleItemPopup(): void {
    this.itemPopup = !this.itemPopup;
  }

  public openItemDetails(item: Item): void {
    this.selectedItem = item;
    this.toggleItemPopup();
  }
}
