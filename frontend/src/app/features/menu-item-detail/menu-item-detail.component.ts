import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../../core/models/item.model';

@Component({
  selector: 'app-menu-item-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './menu-item-detail.component.html',
  styleUrls: ['./menu-item-detail.component.scss'],
})
export class MenuItemDetailComponent {
  faTrash = faTrash;
  @Input() menuItem!: Item;

  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<Item>();

  removeIngredient(ingredient: { name: string; quantity: number }) {
    if (ingredient.quantity > 0) {
      ingredient.quantity--;
    }
  }

  addIngredient(ingredient: { name: string; quantity: number }) {
    ingredient.quantity++;
  }

  onAddToCart() {
    this.addToCart.emit(this.menuItem);
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
