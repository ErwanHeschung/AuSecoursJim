import { Component, Inject, OnInit } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { PaymentLayoutComponent } from '../../layouts/payment-layout/payment-layout.component';
import { ROUTES } from '../../core/utils/constant';
import { BasketService } from '../../shared/services/basket.service';
import { Basket } from '../../core/models/basket.model';
import { IOrderService } from '../../core/models/interfaces/order';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-order-tracking-qrcode',
  imports: [QRCodeComponent, PaymentLayoutComponent],
  templateUrl: './order-tracking-qrcode.component.html',
  styleUrl: './order-tracking-qrcode.component.scss',
})
export class OrderTrackingQRcodeComponent implements OnInit {
  public orderTrackingUrl!: string;

  private baseUrl: string = `localhost:4200/${ROUTES.orderTrackingWithoutId}`;

  constructor(
    @Inject('ORDER_SERVICE') private orderService: IOrderService,
    private basketService: BasketService,
    private routes: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.orderService.latestOrderId$.subscribe((orderId: string | null) => {
      if (orderId) {
        this.orderTrackingUrl = `${this.baseUrl}/${orderId}`;
      }
    });
  }

  redirectToMenu() {
    this.localStorageService.clear();
    this.routes.navigate([ROUTES.landing]);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.orderTrackingUrl);
  }
}
