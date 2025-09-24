import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Item } from '../../core/models/item.model';
import { CounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ICONS } from '../../core/utils/icon';

@Component({
  selector: 'app-menu-item-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CounterComponent],
  templateUrl: './menu-item-detail.component.html',
  styleUrls: ['./menu-item-detail.component.scss'],
})
export class MenuItemDetailComponent {
  public trashIcon: IconDefinition = ICONS['trash'];
  @Input() menuItem!: Item;

  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<Item>();

  onAddToCart() {
    this.addToCart.emit(this.menuItem);
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
