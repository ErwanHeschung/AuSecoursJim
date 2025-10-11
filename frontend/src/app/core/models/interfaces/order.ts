import { Observable } from 'rxjs';
import { Basket } from '../basket.model';

export interface IOrderService {
  latestOrderId$: Observable<string | null>;

  prepareOrderOnFirstFreeOrderNumber(basket: Basket): Observable<void>;

  finishOrder(orderId: string): Observable<void>;
}
