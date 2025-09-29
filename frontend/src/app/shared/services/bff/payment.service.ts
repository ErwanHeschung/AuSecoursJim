import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPaymentService } from '../../../core/models/interfaces/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentServiceBFF implements IPaymentService {
  private apiUrl: string = environment.apiUrl + '/payment';

  constructor(private http: HttpClient) {}

  public pay(): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl);
  }
}
