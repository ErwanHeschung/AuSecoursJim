import { Observable } from 'rxjs';
import { Basket } from '../basket.model';

export interface IOrderService {
  latestOrderId$: Observable<string | null>;

  prepareOrderOnFirstFreeTable(basket: Basket): Observable<void>;
}
