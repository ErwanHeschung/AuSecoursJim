import { Injectable } from '@angular/core';
import { PreparationService } from './gateway-calls/preparation.service';
import {
  combineLatest,
  interval,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { IOrderTrackingService } from '../../../core/models/interfaces/order-tracking';
import { TableService } from './gateway-calls/table.service';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root',
})
export class OrderTrackingService implements IOrderTrackingService {
  constructor(
    private preparationService: PreparationService,
    private tableService: TableService,
    private groupService: GroupService
  ) {}

  public trackPreparation(
    orderId: string,
    pollIntervalMs = 2000
  ): Observable<number> {
    const order$ = this.tableService.getOrder(orderId).pipe(shareReplay(1));

    const preparations$ = interval(pollIntervalMs).pipe(
      startWith(0),
      switchMap(() =>
        order$.pipe(
          switchMap(order =>
            this.preparationService.getPreparations(
              'readyToBeServed',
              order.tableNumber
            )
          )
        )
      )
    );

    return combineLatest([order$, preparations$]).pipe(
      map(([order, preparations]) => {
        const orderPrepIds = order.preparations.map(p => p._id);
        const readyIds = preparations.map(p => p._id);

        const readyCount = orderPrepIds.filter(id =>
          readyIds.includes(id)
        ).length;
        const total = orderPrepIds.length;

        return total > 0 ? Math.round((readyCount / total) * 100) : 0;
      })
    );
  }

  trackGroupPreparation(
    groupId: number,
    pollIntervalMs = 2000
  ): Observable<number> {
    return interval(pollIntervalMs).pipe(
      startWith(0),
      switchMap(() =>
        this.groupService.getGroupOrders(groupId).pipe(
          switchMap((orderIds: string[]) => {
            if (!orderIds || orderIds.length === 0) return of(0);

            const orderProgressObservables = orderIds.map(orderId =>
              this.trackPreparation(orderId, pollIntervalMs)
            );
            return combineLatest(orderProgressObservables).pipe(
              map(progressArray => {
                const totalProgress = progressArray.reduce(
                  (sum, p) => sum + p,
                  0
                );
                return Math.round(totalProgress / progressArray.length);
              })
            );
          })
        )
      ),
      shareReplay(1)
    );
  }
}
