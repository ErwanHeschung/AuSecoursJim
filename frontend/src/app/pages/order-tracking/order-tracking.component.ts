import { Component, Inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderTrackingStatus } from '../../core/models/order-tracking-status';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ICONS } from '../../core/utils/icon';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { ActivatedRoute } from '@angular/router';
import { IOrderTrackingService } from '../../core/models/interfaces/order-tracking';

@Component({
  selector: 'app-order-tracking',
  imports: [FontAwesomeModule, ProgressBarComponent],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss',
})
export class OrderTrackingComponent {
  public status: OrderTrackingStatus = OrderTrackingStatus.InProgress;

  public inProgressIcon: IconDefinition = ICONS['dineIn'];
  public completedIcon: IconDefinition = ICONS['complete'];

  public currentIcon: IconDefinition = this.inProgressIcon;
  public progress: number = 0;
  public orderId!: string;

  constructor(
    private route: ActivatedRoute,
    @Inject('ORDER_TRACKING_SERVICE')
    private orderTrackingService: IOrderTrackingService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')!;

    this.orderTrackingService
      .trackPreparation(this.orderId, 2000)
      .subscribe((progress: number) => {
        this.progress = progress;
        this.status =
          progress === 100
            ? OrderTrackingStatus.Completed
            : OrderTrackingStatus.InProgress;
        this.updateStatusIcon(this.status);
      });
  }

  public updateStatusIcon(newStatus: OrderTrackingStatus): void {
    this.currentIcon =
      newStatus === OrderTrackingStatus.InProgress
        ? this.inProgressIcon
        : this.completedIcon;
  }
}
