import { HttpClient } from '@angular/common/http';
import { IPaymentService } from '../../../core/models/interfaces/payment';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentServiceBFF implements IPaymentService {
  private apiUrl: string = environment.apiUrl + '/payment';

  constructor(private http: HttpClient) {}

  pay(amount: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/pay`, { amount });
  }
}
