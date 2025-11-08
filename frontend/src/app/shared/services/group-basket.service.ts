import { Injectable } from '@angular/core';
import { BasketItem } from '../../core/models/item.model';
import { LocalStorageService } from './local-storage.service';
import { BaseBasketService } from './base-basket.service';

@Injectable({
  providedIn: 'root',
})
export class GroupBasketService extends BaseBasketService {
  private groupLimit?: number;

  constructor(protected override localStorageService: LocalStorageService) {
    super(localStorageService, 'group_basket');
  }

  public setGroupLimit(limit: number | undefined): void {
    this.groupLimit = limit;
  }

  protected canAddItem(item: BasketItem, existing?: BasketItem): boolean {
    if (!this.groupLimit || !item.category) return true;

    const basket = this.basketSubject.value!;
    const categoryTotal = basket.items
      .filter(
        i =>
          i.category === item.category &&
          i.basketItemId !== existing?.basketItemId
      )
      .reduce((s, it) => s + it.quantity, 0);

    return categoryTotal + item.quantity <= this.groupLimit;
  }

  protected canUpdateItem(item: BasketItem, index: number): boolean {
    if (!this.groupLimit || !item.category) return true;

    const basket = this.basketSubject.value!;
    const categoryTotal = basket.items
      .filter((i, idx) => i.category === item.category && idx !== index)
      .reduce((s, it) => s + it.quantity, 0);

    return categoryTotal + item.quantity <= this.groupLimit;
  }
}
