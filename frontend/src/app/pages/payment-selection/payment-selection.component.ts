import { Component, Inject } from '@angular/core';
import { ICONS } from '../../core/utils/icon';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { OptionSelectionLayoutComponent } from '../../layouts/option-selection-layout/option-selection-layout/option-selection-layout.component';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/utils/constant';
import { BasketService } from '../../shared/services/basket.service';
import { Basket } from '../../core/models/basket.model';
import { IOrderService } from '../../core/models/interfaces/order';
import { IPaymentService } from '../../core/models/interfaces/payment';

@Component({
  selector: 'app-payment-selection',
  imports: [OptionSelectionLayoutComponent],
  templateUrl: './payment-selection.component.html',
  styleUrl: './payment-selection.component.scss',
})
export class PaymentSelectionComponent {
  private basket!: Basket;
  public options: {
    label: string;
    icon: IconDefinition;
    onClick: () => void;
  }[] = [
    { label: 'Cash', icon: ICONS['money'], onClick: () => this.selectCash() },
    { label: 'Card', icon: ICONS['card'], onClick: () => this.selectCard() },
  ];

  constructor(
    private router: Router,
    private basketService: BasketService,
    @Inject('ORDER_SERVICE') private orderService: IOrderService,
    @Inject('PAYMENT_SERVICE') private paymentService: IPaymentService
  ) {}

  ngOnInit() {
    this.basketService.basket$.subscribe(basket => {
      this.basket = basket;
    });
  }

  selectCash() {
    this.orderService
      .prepareOrderOnFirstFreeOrderNumber(this.basket)
      .subscribe();
    this.paymentService
      .pay(this.basketService.getTotal())
      .subscribe(result => console.log(result));
    this.router.navigate([ROUTES.orderTrackingQRcode]);
  }

  selectCard() {
    this.router.navigate([ROUTES.splitPayment]);
  }
}
