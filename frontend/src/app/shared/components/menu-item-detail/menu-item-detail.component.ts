import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Item } from '../../../core/models/item.model';
import { CounterComponent } from '../quantity-counter/quantity-counter.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ICONS } from '../../../core/utils/icon';
import { BasketService } from '../../services/basket.service';
import { FormsModule } from '@angular/forms';
import { IngredientService } from '../../services/no-bff/ingredient.service';

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
  public mode!: 'add' | 'update';
  @Input() menuItem!: Item;

  @Output() close = new EventEmitter<void>();

  constructor(
    private basketService: BasketService,
    @Inject('INGREDIENT_SERVICE') private ingredientService: IngredientService
  ) { }

  ngOnInit() {
    const itemQuantity: number = this.getItemQuantity();
    if (itemQuantity > 0) {
      this.mode = 'update';
      this.quantity = itemQuantity;
    } else {
      this.mode = 'add';
      this.quantity = 1;
    }

    if (this.menuItem?.fullName && !this.menuItem.ingredients) {
      this.ingredientService.getItemIngredients(this.menuItem.fullName).subscribe({
        next: ingredients => {
          this.menuItem.ingredients = ingredients || [];
          console.log('Ingrédients chargés:', this.menuItem.ingredients);
        },
        error: err => {
          console.error('Failed to load ingredients:', err);
          this.menuItem.ingredients = [];
        },
      });
    } else if (!this.menuItem.ingredients) {
      this.menuItem.ingredients = [];
    }
  }

  get isPresentInBasket() {
    return this.getItemQuantity() !== 0;
  }

  public addToBasket(): void {
    if (this.mode === 'add')
      this.basketService.addItem({ ...this.menuItem, quantity: this.quantity });
    else
      this.basketService.updateItemQuantity(this.menuItem._id, this.quantity);
    this.close.emit();
  }

  public deleteFromBasket(): void {
    this.basketService.removeItem(this.menuItem._id);
    this.close.emit();
  }

  public onClose(): void {
    this.close.emit();
  }

  public getItemQuantity(): number {
    return this.basketService.getItemQuantity(this.menuItem._id);
  }
}
