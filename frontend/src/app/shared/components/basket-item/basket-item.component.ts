import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { BasketItem, Item } from '../../../core/models/item.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ICONS } from '../../../core/utils/icon';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.scss',
})
export class BasketItemComponent {
  @Input() item!: BasketItem;
  @Input() quantity!: number;
  @Output() edit = new EventEmitter<BasketItem>();

  public trashIcon: IconDefinition = ICONS['trash'];
  public editIcon: IconDefinition = ICONS['edit'];
  private originalIngredients: { [key: string]: number } = {};

  constructor(private basketService: BasketService) {}

  public deleteFromBasket(basketItemId: string | undefined): void {
    if (basketItemId) {
      this.basketService.removeItem(basketItemId);
    }
  }

  public editItem(): void {
    this.edit.emit(this.item);
  }
  get removedIngredientsSummary(): string {
    if (!this.item.ingredients?.length) return '';

    const originalMap = this.basketService.getOriginal(this.item._id).reduce(
      (acc, ing) => {
        acc[ing.name] = ing.quantity;
        return acc;
      },
      {} as Record<string, number>
    );

    const removedIngredients: string[] = [];

    for (const name in originalMap) {
      const originalQty = originalMap[name];
      const current = this.item.ingredients.find(ing => ing.name === name);
      if (!current || current.quantity < originalQty) {
        removedIngredients.push(name);
      }
    }

    return removedIngredients.length
      ? `No ${removedIngredients.join(', ')}`
      : '';
  }

  get addedIngredientsSummary(): string {
    if (!this.item.ingredients?.length) return '';

    const originalMap = this.basketService.getOriginal(this.item._id).reduce(
      (acc, ing) => {
        acc[ing.name] = ing.quantity;
        return acc;
      },
      {} as Record<string, number>
    );

    const addedIngredients = this.item.ingredients
      .filter(ing => (originalMap[ing.name] ?? 0) < ing.quantity)
      .map(ing => ing.name);

    return addedIngredients.length
      ? `Extra ${addedIngredients.join(', ')}`
      : '';
  }

  get hasModifications(): boolean {
    return (
      this.removedIngredientsSummary !== '' ||
      this.addedIngredientsSummary !== ''
    );
  }
}
