import { Component, Input } from '@angular/core';
import { BasketItem, Item } from '../../../core/models/item.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ICONS } from '../../../core/utils/icon';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-basket-item',
  imports: [FaIconComponent],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.scss',
})
export class BasketItemComponent {
  @Input() item!: BasketItem;
  @Input() quantity!: number;

  public trashIcon: IconDefinition = ICONS['trash'];

  constructor(private basketService: BasketService) {}

  public deleteFromBasket(itemId: string): void {
    this.basketService.removeItem(itemId);
  }
}
