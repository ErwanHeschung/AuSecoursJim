import { Component, Inject, OnInit } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { PaymentLayoutComponent } from '../../layouts/payment-layout/payment-layout.component';
import { ROUTES } from '../../core/utils/constant';
import { BasketService } from '../../shared/services/basket.service';
import { Basket } from '../../core/models/basket.model';
import { IOrderService } from '../../core/models/interfaces/order';

@Component({
  selector: 'app-order-tracking-qrcode',
  imports: [QRCodeComponent, PaymentLayoutComponent],
  templateUrl: './order-tracking-qrcode.component.html',
  styleUrl: './order-tracking-qrcode.component.scss',
})
export class OrderTrackingQRcodeComponent implements OnInit {
  public orderTrackingUrl!: string;

  private baseUrl: string = `localhost:4200/${ROUTES.orderTrackingWithoutId}`;

  private basket!: Basket;

  constructor(
    @Inject('ORDER_SERVICE') private orderService: IOrderService,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.orderService.latestOrderId$.subscribe((orderId: string | null) => {
      if (orderId) this.orderTrackingUrl = `${this.baseUrl}/${orderId}`;
    });

    //TODO remove from here, do this after payment
    this.basketService.basket$.subscribe((basket: Basket) => {
      this.basket = basket;
    });
  }

  //TODO remove from here, do this after payment
  prepareOrder() {
    this.orderService.prepareOrderOnFirstFreeTable(this.basket).subscribe();
  }
}
