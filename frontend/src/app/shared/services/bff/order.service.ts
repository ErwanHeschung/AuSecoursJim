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

  prepareOrderOnFirstFreeTable(basket: Basket): Observable<void> {
    console.log('BFF prepareOrderOnFirstFreeTable');
    this.http.get<string>(this.apiUrl);
    return of();
  }
}
