import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPaymentService } from '../../../core/models/interfaces/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService implements IPaymentService {
  constructor() {}

  public pay(amount: number): Observable<boolean> {
    return of(true);
  }
}
