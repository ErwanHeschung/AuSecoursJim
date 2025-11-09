import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { TableService } from './gateway-calls/table.service';
import { BasketItem, OrderItem } from '../../../core/models/item.model';
import { Basket } from '../../../core/models/basket.model';
import { Table } from '../../../core/models/table.model';
import { IOrderService } from '../../../core/models/interfaces/order';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements IOrderService {
  private latestOrderIdSubject = new BehaviorSubject<string | null>(null);
  public latestOrderId$: Observable<string | null> =
    this.latestOrderIdSubject.asObservable();

  constructor(private tableService: TableService, private groupService:GroupService) {}

  public prepareOrderOnFirstFreeOrderNumber(basket: Basket): Observable<void> {
    return this.getFirstFreeOrderNumber().pipe(
      switchMap(table => {
        if (!table) {
          throw new Error('No free table available');
        }
        return this.prepareOrder(table.number, basket);
      })
    );
  }

  public prepareOrder(orderNumber: number, basket: Basket): Observable<void> {
    return this.tableService.openOrder(orderNumber).pipe(
      switchMap(orderId => {
        const addItems$ = basket.items.map((item: BasketItem) => {
          const orderItem: OrderItem = {
            menuItemId: item._id,
            menuItemShortName: item.shortName,
            howMany: Number(item.quantity),
          };
          return this.tableService.addMenuToOrder(orderId, orderItem);
        });

        return forkJoin(addItems$).pipe(
          switchMap(() => this.tableService.prepareOrder(orderId)),
          map(() => {
            this.latestOrderIdSubject.next(orderId);
            return;
          })
        );
      })
    );
  }

  private getFirstFreeOrderNumber(): Observable<Table | undefined> {
    return this.tableService
      .getTables()
      .pipe(map(tables => tables.find(table => !table.taken)));
  }

  public finishOrder(orderId: string): Observable<void> {
    return this.tableService.finishOrder(orderId);
  }

  public finishGroup(groupId: number): Observable<void> {
    return this.groupService.getGroupOrders(groupId).pipe(
      switchMap((orderIds: string[]) => {
        const finishCalls: Observable<void>[] = orderIds.map(orderId =>
          this.finishOrder(orderId)
        );
        return forkJoin(finishCalls).pipe(
          switchMap(() => {
            return new Observable<void>(observer => {
              observer.next();
              observer.complete();
            });
          })
        );
      })
    );
  }
}
