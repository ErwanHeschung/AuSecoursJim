import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Table } from '../../../../core/models/table.model';
import { BasketItem, OrderItem } from '../../../../core/models/item.model';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private apiUrl: string = environment.apiUrl + '/dining';

  constructor(private http: HttpClient) {}

  public getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}/tables`);
  }

  public openOrder(tableNumber: number): Observable<string> {
    return this.http
      .post<{
        _id: string;
      }>(`${this.apiUrl}/tableOrders`, { tableNumber, customersCount: 1 })
      .pipe(map(response => response._id));
  }

  public addMenuToOrder(orderId: string, item: OrderItem): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/tableOrders/${orderId}`, item);
  }

  public prepareOrder(orderId: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/tableOrders/${orderId}/prepare`,
      {}
    );
  }

  public finishOrder(orderId: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/tableOrders/${orderId}/bill`,
      {}
    );
  }
}
