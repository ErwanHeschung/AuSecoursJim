import { Observable } from 'rxjs';
import { Basket } from '../basket.model';
import { Order } from '../order.model';

export interface IOrderService {
  prepareOrderOnFirstFreeOrderNumber(basket: Basket): Observable<void>;

  prepareOrder(orderNumber: number, basket: Basket): Observable<void>;

  finishOrder(orderId: string): Observable<void>;
}
