import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { BasketService } from '../../services/basket.service';
import { Basket } from '../../../core/models/basket.model';
import { BasketItemComponent } from '../basket-item/basket-item.component';

@Component({
  selector: 'app-basket',
  imports: [PopupComponent, BasketItemComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  public basket!: Basket;

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.basketService.basket$.subscribe(basket => {
      this.basket = basket;
    });
  }

  get basketTotal(): number {
    return this.basketService.getTotal();
  }

  get basketQuantity(): number {
    return this.basketService.getQuantity();
  }

  public closePopup() {
    this.close.emit();
  }
}
