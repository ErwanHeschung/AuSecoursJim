import { BehaviorSubject } from 'rxjs';
import { Basket } from '../../core/models/basket.model';
import { BasketItem } from '../../core/models/item.model';
import { Ingredient } from '../../core/models/ingredient.model';
import { LocalStorageService } from './local-storage.service';

export abstract class BaseBasketService {
  protected basketSubject = new BehaviorSubject<Basket>({
    _id: undefined,
    items: [],
  });
  public basket$ = this.basketSubject.asObservable();
  protected originalIngredientsMap = new Map<string, Ingredient[]>();

  constructor(
    protected localStorageService: LocalStorageService,
    protected STORAGE_KEY: string 
  ) {
    this.loadStorage();
  }

  protected loadStorage(): void {
    const savedBasket = this.localStorageService.getItem<Basket>(
      this.STORAGE_KEY
    );
    if (savedBasket) this.basketSubject.next(savedBasket);

    const savedOriginal = this.localStorageService.getItem<
      Record<string, Ingredient[]>
    >(`${this.STORAGE_KEY}_original`);
    if (savedOriginal)
      this.originalIngredientsMap = new Map(Object.entries(savedOriginal));
  }

  protected save(): void {
    const basket = this.basketSubject.value;
    if (!basket) return;

    this.localStorageService.setItem(this.STORAGE_KEY, basket);

    const mapObj: Record<string, Ingredient[]> = {};
    this.originalIngredientsMap.forEach((v, k) => (mapObj[k] = v));
    this.localStorageService.setItem(`${this.STORAGE_KEY}_original`, mapObj);
  }

  protected generateBasketItemId(): string {
    return `basket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  protected areIngredientsEqual(
    ing1?: Ingredient[],
    ing2?: Ingredient[]
  ): boolean {
    if (!ing1 || ing1.length === 0) return !ing2 || ing2.length === 0;
    if (!ing2 || ing2.length === 0) return false;
    if (ing1.length !== ing2.length) return false;

    return ing1.every(
      (i, idx) => i.name === ing2[idx].name && i.quantity === ing2[idx].quantity
    );
  }

  public addItem(item: BasketItem): void {
    const basket = this.basketSubject.value!;
    const existing = basket.items.find(
      i =>
        i._id === item._id &&
        this.areIngredientsEqual(i.ingredients, item.ingredients)
    );

    if (!this.canAddItem(item, existing)) return;

    if (existing) existing.quantity += Number(item.quantity);
    else
      basket.items.push({ ...item, basketItemId: this.generateBasketItemId() });

    this.basketSubject.next(basket);
    this.save();
  }

  public updateItem(item: BasketItem): void {
    const basket = this.basketSubject.value!;
    const index = basket.items.findIndex(
      i => i.basketItemId === item.basketItemId
    );
    if (index === -1) return;

    if (!this.canUpdateItem(item, index)) return;

    basket.items[index] = { ...item };
    this.basketSubject.next(basket);
    this.save();
  }

  public removeItem(basketItemId: string): void {
    const basket = this.basketSubject.value!;
    basket.items = basket.items.filter(i => i.basketItemId !== basketItemId);
    this.basketSubject.next(basket);
    this.save();
  }

  public removeItemsByItemId(itemId: string): void {
    const basket = this.basketSubject.value!;
    basket.items = basket.items.filter(i => i._id !== itemId);
    this.basketSubject.next(basket);
    this.save();
  }

  public updateItemQuantity(itemId: string, quantity: number): void {
    const basket = this.basketSubject.value!;
    const item = basket.items.find(i => i._id === itemId);
    if (!item) return;

    item.quantity = quantity;
    if (item.quantity <= 0) this.removeItem(item.basketItemId!);
    else {
      this.basketSubject.next(basket);
      this.save();
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
    return this.basketSubject.value!.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  public getQuantity(): number {
    return this.basketSubject.value!.items.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
  }

  public storeOriginal(itemId: string, ingredients: Ingredient[]): void {
    if (!this.originalIngredientsMap.has(itemId))
      this.originalIngredientsMap.set(
        itemId,
        ingredients.map(i => ({ ...i }))
      );
  }

  public getOriginal(itemId: string): Ingredient[] {
    return this.originalIngredientsMap.get(itemId)?.map(i => ({ ...i })) ?? [];
  }

  public hasOriginal(itemId: string): boolean {
    return this.originalIngredientsMap.has(itemId);
  }

  /** Méthodes à surcharger selon type de panier */
  protected abstract canAddItem(
    item: BasketItem,
    existing?: BasketItem
  ): boolean;
  protected abstract canUpdateItem(item: BasketItem, index: number): boolean;
}
