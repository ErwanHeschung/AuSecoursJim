import { Component, Inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderTrackingStatus } from '../../core/models/order-tracking-status';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ICONS } from '../../core/utils/icon';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrderTrackingService } from '../../core/models/interfaces/order-tracking';
import { IOrderService } from '../../core/models/interfaces/order';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { ROUTES } from '../../core/utils/constant';

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
  private orderCompleted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    @Inject('ORDER_TRACKING_SERVICE')
    private orderTrackingService: IOrderTrackingService,
    @Inject('ORDER_SERVICE')
    private orderService: IOrderService,
    private localStorageService: LocalStorageService,
    private router: Router
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
        if (
          this.status === OrderTrackingStatus.Completed &&
          !this.orderCompleted
        ) {
          this.orderService.finishOrder(this.orderId).subscribe(() => {
            this.orderCompleted = true;
            this.localStorageService.clear();
            setTimeout(() => {
              this.router.navigate([ROUTES.landing]);
            }, 4000);
          });
        }
      });
  }

  public updateStatusIcon(newStatus: OrderTrackingStatus): void {
    this.currentIcon =
      newStatus === OrderTrackingStatus.InProgress
        ? this.inProgressIcon
        : this.completedIcon;
  }
}
