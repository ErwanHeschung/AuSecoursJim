import { Observable } from 'rxjs';

export interface IPaymentService {
  pay(amount: number): Observable<boolean>;
}
