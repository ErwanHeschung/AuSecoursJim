import { Injectable } from '@angular/core';
import { BasketItem } from '../../core/models/item.model';
import { BehaviorSubject } from 'rxjs';
import { Basket } from '../../core/models/basket.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private readonly STORAGE_KEY = 'basket';
  private basketSubject = new BehaviorSubject<Basket>({
    _id: undefined,
    items: [],
  });
  public basket$ = this.basketSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const saved = this.localStorageService.getItem<Basket>(this.STORAGE_KEY);
    if (saved) {
      this.basketSubject.next(saved);
    } else {
      this.basketSubject.next({ _id: undefined, items: [] });
    }
  }

  public addItem(item: BasketItem): void {
    const basket = this.basketSubject.value!;
    const existing = basket.items.find(i => i._id === item._id);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      basket.items.push({ ...item });
    }

    this.basketSubject.next(basket);
    this.save();
  }

  public removeItem(itemId: string): void {
    const basket = this.basketSubject.value!;
    basket.items = basket.items.filter(i => i._id !== itemId);
    this.basketSubject.next(basket);
    this.save();
  }

  public updateItemQuantity(itemId: string, quantity: number): void {
    const basket = this.basketSubject.value!;
    const item = basket.items.find(i => i._id === itemId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) this.removeItem(itemId);
      else {
        this.basketSubject.next(basket);
        this.save();
      }
    }
  }

  public getItemQuantity(itemId: string): number {
    const basket = this.basketSubject.value!;
    const item = basket.items.find(i => i._id === itemId);
    return item ? item.quantity : 0;
  }

  public clearBasket(): void {
    this.basketSubject.next({ _id: undefined, items: [] });
    this.localStorageService.removeItem(this.STORAGE_KEY);
  }

  public getTotal(): number {
    const basket = this.basketSubject.value!;
    return basket.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  public getQuantity(): number {
    const basket = this.basketSubject.value!;
    return basket.items.reduce((sum, item) => sum + Number(item.quantity), 0);
  }

  private save() {
    if (this.basketSubject.value) {
      this.localStorageService.setItem(
        this.STORAGE_KEY,
        this.basketSubject.value
      );
    }
  }
}
