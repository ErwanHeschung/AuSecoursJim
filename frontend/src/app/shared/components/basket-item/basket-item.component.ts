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
    if (!this.item.ingredients || this.item.ingredients.length === 0) {
      return '';
    }

    const removedIngredients = this.item.ingredients
      .filter(ing => ing.quantity === 0)
      .map(ing => ing.name);

    if (removedIngredients.length === 0) {
      return '';
    }

    return `No ${removedIngredients.join(', ')}`;
  }

  get addedIngredientsSummary(): string {
    if (
      !this.item.ingredients ||
      this.item.ingredients.length === 0 ||
      Object.keys(this.originalIngredients).length === 0
    ) {
      return '';
    }

    const addedIngredients = this.item.ingredients
      .filter(ing => {
        const original = this.originalIngredients[ing.name];
        return original !== undefined && ing.quantity > original;
      })
      .map(ing => ing.name);

    if (addedIngredients.length === 0) {
      return '';
    }

    return `Extra ${addedIngredients.join(', ')}`;
  }

  get hasModifications(): boolean {
    return (
      this.removedIngredientsSummary !== '' ||
      this.addedIngredientsSummary !== ''
    );
  }
}
