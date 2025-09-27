import { Component } from '@angular/core';
import { PaymentLayoutComponent } from '../../layouts/payment-layout/payment-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderStatus } from '../../shared/models/orderStatus';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ICONS } from '../../core/utils/icon';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-tracking',
  imports: [FontAwesomeModule, ProgressBarComponent],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss',
})
export class OrderTrackingComponent {
  public status: OrderStatus = OrderStatus.InProgress;

  public inProgressIcon: IconDefinition = ICONS['dineIn'];
  public completedIcon: IconDefinition = ICONS['complete'];

  public currentIcon: IconDefinition = this.inProgressIcon;

  public stepNumber: number = 2;
  public currentStep: number = 0;

  public orderId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')!;
  }

  public updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
    this.currentStep = newStatus === OrderStatus.InProgress ? 0 : 1;
    this.currentIcon =
      newStatus === OrderStatus.InProgress
        ? this.inProgressIcon
        : this.completedIcon;
  }
}
