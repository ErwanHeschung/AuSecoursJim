import { Injectable } from '@angular/core';
import { PreparationService } from './gateway-calls/preparation.service';
import {
  combineLatest,
  interval,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { IOrderTrackingService } from '../../../core/models/interfaces/order-tracking';
import { TableService } from './gateway-calls/table.service';

@Injectable({
  providedIn: 'root',
})
export class OrderTrackingService implements IOrderTrackingService {
  constructor(
    private preparationService: PreparationService,
    private tableService: TableService
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
}
