import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { TableService } from './gateway-calls/table.service';
import { BasketItem, OrderItem } from '../../../core/models/item.model';
import { Basket } from '../../../core/models/basket.model';
import { Table } from '../../../core/models/table.model';
import { IOrderService } from '../../../core/models/interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements IOrderService {
  private latestOrderIdSubject = new BehaviorSubject<string | null>(null);
  public latestOrderId$: Observable<string | null> =
    this.latestOrderIdSubject.asObservable();

  constructor(private tableService: TableService) {}

  public prepareOrderOnFirstFreeTable(basket: Basket): Observable<void> {
    return this.getFirstFreeTable().pipe(
      switchMap(table => {
        if (!table) {
          throw new Error('No free table available');
        }
        return this.prepareOrder(table.number, basket);
      })
    );
  }

  public prepareOrder(tableNumber: number, basket: Basket): Observable<void> {
    return this.tableService.openOrder(tableNumber).pipe(
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

  private getFirstFreeTable(): Observable<Table | undefined> {
    return this.tableService
      .getTables()
      .pipe(map(tables => tables.find(table => !table.taken)));
  }
}
