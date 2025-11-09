import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrderService } from '../../../core/models/interfaces/order';
import { Basket } from '../../../core/models/basket.model';

@Injectable({
  providedIn: 'root',
})
export class OrderServiceBFF implements IOrderService {
  private apiUrl: string = environment.apiUrl + '/order';

  private latestOrderIdSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  public latestOrderId$: Observable<string | null> =
    this.latestOrderIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  prepareOrderOnFirstFreeOrderNumber(basket: Basket): Observable<void> {
    this.http.post(`${this.apiUrl}/prepare`, { basket }).subscribe(result => {
      this.latestOrderIdSubject.next((result as any).orderId);
    });
    return of();
  }

  finishOrder(orderId: string): Observable<void> {
    this.http.post(`${this.apiUrl}/finish`, { orderId }).subscribe();
    return of();
  }

  finishGroup(groupId: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
