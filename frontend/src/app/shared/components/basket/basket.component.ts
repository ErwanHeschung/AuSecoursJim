import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { BasketService } from '../../services/basket.service';
import { Basket } from '../../../core/models/basket.model';
import { BasketItemComponent } from '../basket-item/basket-item.component';
import { Router } from '@angular/router';
import { ROUTES } from '../../../core/utils/constant';

@Component({
  selector: 'app-basket',
  imports: [PopupComponent, BasketItemComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  public basket!: Basket;

  constructor(
    private basketService: BasketService,
    private router: Router
  ) {}

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

  public choosePaymentMethod(): void {
    this.router.navigate([ROUTES.paymentSelection]);
  }
}
