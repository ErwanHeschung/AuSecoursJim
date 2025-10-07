import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrderService } from '../../../core/models/interfaces/order';
import { Basket } from '../../../core/models/basket.model';

@Injectable({
  providedIn: 'root',
})
export class OrderServiceBFF implements IOrderService {
  private apiUrl: string = environment.apiUrl + '/order';
  public latestOrderId$: Observable<string | null> = new Observable<
    string | null
  >();

  constructor(private http: HttpClient) {}

  prepareOrderOnFirstFreeOrderNumber(basket: Basket): Observable<void> {
    console.log('BFF prepareOrderOnFirstFreeOrderNumber');
    this.http.get<string>(this.apiUrl).subscribe(result => console.log(result));
    return of();
  }

  finishOrder(orderId: string): Observable<void> {
    console.log('BFF finishOrder');
    throw of();
  }
}
