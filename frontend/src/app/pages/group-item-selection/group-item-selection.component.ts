import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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
import { GroupService } from '../../shared/services/no-bff/group.service';
import { Group } from '../../core/models/group.model';

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
export class GroupSelectionComponent implements OnInit, OnDestroy {
  public arrowLeft: IconDefinition = ICONS['arrowLeft'];
  public arrowRight: IconDefinition = ICONS['arrowRight'];
  public group: IconDefinition = ICONS['group'];
  protected itemPopup: boolean = false;

  protected groupId: string = 'group123';
  protected nbPersons: number = 3;
  protected nbMenu: number = 0;

  items: Item[] = [];

  protected selectedItem: Item = this.items[0];

  constructor(
    private basketService: BasketService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private groupService: GroupService
  ) {
    this.basketService.setIsGroupOrder(true);
    this.basketService.setGroupLimit(this.nbPersons);
    this.basketSub = this.basketService.basket$.subscribe(() => {
      this.computeNbMenu();
    });
  }

  ngOnInit(): void {
    const group = this.localStorageService.getItem<Group>('group');
    const myNumberOfPersons =
      this.localStorageService.getItem<number>('myNumberOfPersons');

    if (group) {
      this.groupId = group.groupId.toString();
      this.nbPersons = myNumberOfPersons || 1;
      this.basketService.setGroupLimit(this.nbPersons);

      this.groupService.getGroupMenuItems(group.groupId).subscribe({
        next: menuItems => {
          this.items = menuItems;
          if (this.items.length > 0) {
            this.selectedItem = this.items[0];
          }
          this.computeNbMenu();
        },
        error: err => {
          console.error('Error fetching group menu items:', err);
        },
      });
    } else {
      this.computeNbMenu();
    }
  }

  private basketSub?: Subscription;

  itemsByCategory(
    category: 'starter' | 'main' | 'dessert' | 'beverage'
  ): Item[] {
    return this.items.filter(i => i.category.toLowerCase() === category);
  }

  selectionCount(
    category?: 'starter' | 'main' | 'dessert' | 'beverage'
  ): number {
    if (category) {
      return this.itemsByCategory(category).reduce(
        (s, it) => s + Number(this.basketService.getItemQuantity(it._id)),
        0
      );
    }
    return this.items.reduce(
      (s, it) => s + Number(this.basketService.getItemQuantity(it._id)),
      0
    );
  }

  onIncrement(item: Item): void {
    const category = item.category as
      | 'starter'
      | 'main'
      | 'dessert'
      | 'beverage';
    const categoryCount = Number(this.selectionCount(category));
    const perItemMax = this.nbPersons;
    const current = Number(this.getQuantity(item));
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
    const beverages = this.selectionCount('beverage');
    this.nbMenu = Math.min(starters, mains, desserts, beverages);
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
