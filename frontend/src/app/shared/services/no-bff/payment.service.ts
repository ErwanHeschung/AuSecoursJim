import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPaymentService } from '../../../core/models/interfaces/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService implements IPaymentService {
  constructor() {}

  public pay(): Observable<boolean> {
    // TODO: logic of payment
    return of(true);
  }
}
