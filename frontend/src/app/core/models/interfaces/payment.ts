import { Observable } from 'rxjs';

export interface IPaymentService {
  pay(): Observable<boolean>;
}
