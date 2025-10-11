import { Injectable } from '@angular/core';
import { PreparationService } from './gateway-calls/preparation.service';
import { interval, map, Observable, startWith, switchMap } from 'rxjs';
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
    return interval(pollIntervalMs).pipe(
      startWith(0),
      switchMap(() =>
        this.tableService.getOrder(orderId).pipe(
          switchMap(order =>
            this.preparationService
              .getPreparations('readyToBeServed', order.tableNumber)
              .pipe(
                map(preparations => {
                  const orderPrepIds = order.preparations.map(p => p._id);
                  const readyIds = preparations.map(p => p._id);

                  const readyCount = orderPrepIds.filter(id =>
                    readyIds.includes(id)
                  ).length;
                  const total = orderPrepIds.length;

                  return total > 0 ? Math.round((readyCount / total) * 100) : 0;
                })
              )
          )
        )
      )
    );
  }
}
