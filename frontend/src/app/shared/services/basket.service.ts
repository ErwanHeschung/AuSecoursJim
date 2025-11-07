import { Injectable, Input } from '@angular/core';
import { BasketItem } from '../../core/models/item.model';
import { BehaviorSubject } from 'rxjs';
import { Basket } from '../../core/models/basket.model';
import { LocalStorageService } from './local-storage.service';
import { Ingredient } from '../../core/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private IS_GROUP_ORDER!: boolean;
  private STORAGE_KEY = 'basket';
  private basketSubject = new BehaviorSubject<Basket>({
    _id: undefined,
    items: [],
  });
  public basket$ = this.basketSubject.asObservable();
  private originalIngredientsMap = new Map<string, Ingredient[]>();
  private groupLimit?: number;

  constructor(private localStorageService: LocalStorageService) {
    this.loadStorage();
  }

  public setIsGroupOrder(isGroup: boolean): void {
    this.IS_GROUP_ORDER = isGroup;
    this.STORAGE_KEY = isGroup ? 'group_basket' : 'basket';
    this.loadStorage();
  }

  private loadStorage(): void {
    const savedBasket = this.localStorageService.getItem<Basket>(
      this.STORAGE_KEY
    );
    if (savedBasket) {
      this.basketSubject.next(savedBasket);
    }

    const savedOriginal = this.localStorageService.getItem<
      Record<string, Ingredient[]>
    >(`${this.STORAGE_KEY}_original`);
    if (savedOriginal) {
      this.originalIngredientsMap = new Map(Object.entries(savedOriginal));
    }
  }

  public setGroupLimit(limit: number | undefined): void {
    this.groupLimit = limit;
  }

  public addItem(item: BasketItem): void {
    const basket = this.basketSubject.value!;
    const originalSnapshot = this.getOriginal(item._id);

    const existing = basket.items.find(
      i =>
        i._id === item._id &&
        this.areIngredientsEqual(i.ingredients, item.ingredients)
    );

    if (this.IS_GROUP_ORDER && this.groupLimit && item.category) {
      const category = item.category;
      const categoryTotal = basket.items
        .filter(i => i.category === category)
        .reduce((s, it) => s + it.quantity, 0);
      const existingQty = existing ? existing.quantity : 0;
      const newCategoryTotal =
        categoryTotal -
        existingQty +
        (existing ? existingQty + item.quantity : item.quantity);
      if (newCategoryTotal > this.groupLimit) {
        return;
      }
    }

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      basket.items.push({
        ...item,
        basketItemId: this.generateBasketItemId(),
      });
    }

    this.basketSubject.next(basket);
    this.save();
  }

  private generateBasketItemId(): string {
    return `basket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public updateItem(item: BasketItem): void {
    const basket = this.basketSubject.value!;
    const index = basket.items.findIndex(
      i => i.basketItemId === item.basketItemId
    );
    if (index !== -1) {
      if (this.IS_GROUP_ORDER && this.groupLimit && item.category) {
        const category = item.category;
        const categoryTotal = basket.items
          .filter(i => i.category === category)
          .reduce((s, it) => s + it.quantity, 0);
        const existingQty = basket.items[index].quantity;
        const newCategoryTotal = categoryTotal - existingQty + item.quantity;
        if (newCategoryTotal > this.groupLimit) {
          return;
        }
      }

      basket.items[index] = { ...item };
      this.basketSubject.next(basket);
      this.save();
    }
  }

  private areIngredientsEqual(
    ingredients1: any[] | undefined,
    ingredients2: any[] | undefined
  ): boolean {
    if (!ingredients1 || ingredients1.length === 0) {
      return !ingredients2 || ingredients2.length === 0;
    }
    if (!ingredients2 || ingredients2.length === 0) {
      return false;
    }

    if (ingredients1.length !== ingredients2.length) {
      return false;
    }

    return ingredients1.every((ing1, index) => {
      const ing2 = ingredients2[index];
      return ing1.name === ing2.name && ing1.quantity === ing2.quantity;
    });
  }

  public removeItem(basketItemId: string): void {
    const basket = this.basketSubject.value!;
    basket.items = basket.items.filter(i => i.basketItemId !== basketItemId);
    this.basketSubject.next(basket);
    this.save();
  }

  public removeItemsByItemId(itemId: string): void {
    const basket = this.basketSubject.value!;
    const idx = basket.items.findIndex(i => i._id === itemId);
    if (idx === -1) return;
    const item = basket.items[idx];
    item.quantity = (item.quantity || 0) - 1;
    if (item.quantity <= 0) {
      basket.items.splice(idx, 1);
    }
    this.basketSubject.next(basket);
    this.save();
  }

  public updateItemQuantity(itemId: string, quantity: number): void {
    const basket = this.basketSubject.value!;
    const item = basket.items.find(i => i._id === itemId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) this.removeItem(item.basketItemId || '');
      else {
        this.basketSubject.next(basket);
        this.save();
      }
    }
  }

  public getItemQuantity(itemId: string): number {
    const basket = this.basketSubject.value!;
    return basket.items
      .filter(i => i._id === itemId)
      .reduce((s, it) => s + it.quantity, 0);
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
    const basket = this.basketSubject.value;
    if (basket) {
      this.localStorageService.setItem(this.STORAGE_KEY, basket);
      const mapObj: Record<string, Ingredient[]> = {};
      this.originalIngredientsMap.forEach((value, key) => {
        mapObj[key] = value;
      });
      this.localStorageService.setItem(`${this.STORAGE_KEY}_original`, mapObj);
    }
  }

  public storeOriginal(itemId: string, ingredients: Ingredient[]): void {
    if (!this.originalIngredientsMap.has(itemId)) {
      this.originalIngredientsMap.set(
        itemId,
        ingredients.map(ing => ({ ...ing }))
      );
    }
  }

  public getOriginal(itemId: string): Ingredient[] {
    return (
      this.originalIngredientsMap.get(itemId)?.map(ing => ({ ...ing })) ?? []
    );
  }

  public hasOriginal(itemId: string): boolean {
    return this.originalIngredientsMap.has(itemId);
  }
}
