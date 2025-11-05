import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketItem } from '../../../core/models/item.model';

@Component({
  selector: 'app-group-item',
  standalone: true,
  imports: [],
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
})
export class GroupItemComponent {
  @Input() item!: BasketItem;
  @Input() quantity = 0;

  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();

  requestIncrement(): void {
    this.increment.emit();
  }

  requestDecrement(): void {
    if (this.quantity > 0) {
      this.decrement.emit();
    }
  }
}
