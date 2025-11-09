import { Injectable } from '@angular/core';
import { BasketItem } from '../../core/models/item.model';
import { LocalStorageService } from './local-storage.service';
import { BaseBasketService } from './base-basket.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService extends BaseBasketService {
  constructor(protected override localStorageService: LocalStorageService) {
    super(localStorageService, 'basket');
  }

  protected canAddItem(item: BasketItem): boolean {
    return true;
  }

  protected canUpdateItem(item: BasketItem): boolean {
    return true;
  }
}
