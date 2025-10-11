import { Injectable } from '@angular/core';
import { BasketItem } from '../../core/models/item.model';
import { BehaviorSubject } from 'rxjs';
import { Basket } from '../../core/models/basket.model';
import { LocalStorageService } from './local-storage.service';
import { Ingredient } from '../../core/models/ingredient.model';

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
  private originalIngredientsMap = new Map<string, Ingredient[]>();

  constructor(private localStorageService: LocalStorageService) {
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

  public addItem(item: BasketItem): void {
    const basket = this.basketSubject.value!;
    const originalSnapshot = this.getOriginal(item._id);

    const existing = basket.items.find(
      i =>
        i._id === item._id &&
        this.areIngredientsEqual(i.ingredients, item.ingredients)
    );

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
