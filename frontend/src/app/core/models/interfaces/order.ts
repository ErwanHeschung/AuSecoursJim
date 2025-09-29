import { Observable } from 'rxjs';
import { Basket } from '../basket.model';

export interface IOrderService {
  prepareOrderOnFirstFreeTable(basket: Basket): Observable<void>;

  prepareOrder(tableNumber: number, basket: Basket): Observable<void>;

  finishOrder(orderId: string): Observable<void>;
}
