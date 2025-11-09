import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Item, BasketItem } from '../../../core/models/item.model';
import { CounterComponent } from '../quantity-counter/quantity-counter.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ICONS } from '../../../core/utils/icon';
import { BasketService } from '../../services/basket.service';
import { FormsModule } from '@angular/forms';
import { GroupBasketService } from '../../services/group-basket.service';

@Component({
  selector: 'app-menu-item-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CounterComponent, FormsModule],
  templateUrl: './menu-item-detail.component.html',
  styleUrls: ['./menu-item-detail.component.scss'],
})
export class MenuItemDetailComponent implements OnInit {
  public trashIcon: IconDefinition = ICONS['trash'];
  public quantity: number = 1;
  public maxQuantity: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  @Input() menuItem!: Item | BasketItem;
  @Input() isEditMode: boolean = false;
  @Input() basketService!: BasketService | GroupBasketService;

  @Output() close = new EventEmitter<void>();

  constructor(private defaultBasketService: BasketService) {}

  ngOnInit() {
    this.basketService = this.basketService ?? this.defaultBasketService;

    if (!this.basketService.hasOriginal(this.menuItem._id)) {
      this.basketService.storeOriginal(
        this.menuItem._id,
        this.menuItem.ingredients ?? []
      );
    }

    if (!this.isEditMode && this.menuItem.ingredients) {
      this.menuItem.ingredients = this.basketService.getOriginal(
        this.menuItem._id
      );
    }

    this.quantity = this.isBasketItem(this.menuItem)
      ? this.menuItem.quantity
      : 1;
  }

  private isBasketItem(item: Item | BasketItem): item is BasketItem {
    return 'quantity' in item && 'basketItemId' in item;
  }

  get isPresentInBasket() {
    return this.getItemQuantity() !== 0;
  }

  public addToBasket(): void {
    const itemToAdd = {
      ...this.menuItem,
      quantity: this.quantity,
      ingredients: this.menuItem.ingredients
        ? JSON.parse(JSON.stringify(this.menuItem.ingredients))
        : undefined,
    };

    if (this.isEditMode && this.isBasketItem(this.menuItem)) {
      this.basketService.updateItem(itemToAdd as BasketItem);
    } else {
      this.basketService.addItem(itemToAdd as BasketItem);
    }
    this.close.emit();
  }

  public deleteFromBasket(): void {
    if (this.isBasketItem(this.menuItem) && this.menuItem.basketItemId) {
      this.basketService.removeItem(this.menuItem.basketItemId);
    } else {
      this.basketService.removeItemsByItemId(this.menuItem._id);
    }
    this.close.emit();
  }

  public onClose(): void {
    this.close.emit();
  }

  public getItemQuantity(): number {
    return this.basketService.getItemQuantity(this.menuItem._id);
  }
}
