import { Component, OnInit } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { PaymentLayoutComponent } from '../../layouts/payment-layout/payment-layout.component';
import { OrderService } from '../../shared/services/no-bff/order.service';
import { ROUTES } from '../../core/utils/constant';
import { BasketService } from '../../shared/services/basket.service';
import { Basket } from '../../core/models/basket.model';

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
    private orderService: OrderService,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.orderService.latestOrderId$.subscribe((orderId: string | null) => {
      if (orderId) {
        this.orderTrackingUrl = `${this.baseUrl}/${orderId}`;
      }
    });
  }
}
