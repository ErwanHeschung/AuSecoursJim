import { Component, Inject, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-tracking',
  imports: [FontAwesomeModule, ProgressBarComponent],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss',
})
export class OrderTrackingComponent implements OnDestroy {
  public status: OrderTrackingStatus = OrderTrackingStatus.InProgress;

  public inProgressIcon: IconDefinition = ICONS['dineIn'];
  public completedIcon: IconDefinition = ICONS['complete'];

  public currentIcon: IconDefinition = this.inProgressIcon;
  public progress: number = 0;
  public orderId!: string;
  private orderCompleted: boolean = false;
  private preparationSub?: Subscription;

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
    this.route.queryParamMap.subscribe(params => {
      const orderId = params.get('orderId');
      const groupId = Number(params.get('groupId'));
      if (orderId) {
        this.trackOrder(orderId);
      } else if (groupId !== null) {
        this.trackGroup(groupId);
      }
    });
  }

  private trackOrder(orderId: string) {
    this.preparationSub = this.orderTrackingService
      .trackPreparation(orderId, 2000)
      .subscribe(progress => this.updateProgress(progress, orderId));
  }

  private trackGroup(groupId: number) {
    this.preparationSub = this.orderTrackingService
      .trackGroupPreparation(groupId, 2000)
      .subscribe(progress => this.updateProgress(progress, groupId));
  }

  private updateProgress(progress: number, id: string | number) {
    this.progress = progress;
    this.status =
      progress === 100
        ? OrderTrackingStatus.Completed
        : OrderTrackingStatus.InProgress;
    this.updateStatusIcon(this.status);

    if (this.status === OrderTrackingStatus.Completed && !this.orderCompleted) {
      this.orderCompleted = true;

      if (this.route.snapshot.queryParamMap.get('orderId')) {
      this.orderService.finishOrder(id as string).subscribe(() => this.onCompletion());
    } else if (typeof id === 'number') {
      this.orderService.finishGroup(id).subscribe(() => this.onCompletion());
    }
    }
  }

  private onCompletion() {
    this.localStorageService.clear();
    setTimeout(() => this.router.navigate([ROUTES.landing]), 4000);
  }

  public updateStatusIcon(newStatus: OrderTrackingStatus): void {
    this.currentIcon =
      newStatus === OrderTrackingStatus.InProgress
        ? this.inProgressIcon
        : this.completedIcon;
  }

  ngOnDestroy() {
    this.preparationSub?.unsubscribe();
  }
}
