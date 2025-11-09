import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../../../core/models/group.model';
import { environment } from '../../../../environments/environment';
import { Item } from '../../../core/models/item.model';
import { GroupTable } from '../../../core/models/group-table.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly apiUrl: string = environment.apiUrl + '/group/groups';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  findByGroupId(groupId: number | string): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${groupId}`);
  }

  getGroupMenuItems(groupId: number | string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/${groupId}/menuItems`);
  }

  joinGroup(
    numberOfPersons: number,
    groupId: number | string
  ): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}/${groupId}/join`, null, {
      params: { numberOfPersons: numberOfPersons.toString() },
    });
  }

  closeGroup(groupId: number | string): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}/${groupId}/close`, null);
  }

  addOrderToGroup(groupId: number, orderId: string): Observable<Group> {
    return this.http.post<Group>(
      `${this.apiUrl}/${groupId}/orders?orderId=${orderId}`,
      {}
    );
  }

  getGroupOrders(groupId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${groupId}/orders`);
  }

  getGroupTables(groupId: number | string): Observable<GroupTable[]> {
    return this.http.get<GroupTable[]>(`${this.apiUrl}/${groupId}/tables`);
  }

  assignPeopleToTable(
    groupId: number | string,
    tableNumber: number,
    count: number
  ): Observable<GroupTable> {
    return this.http.post<GroupTable>(
      `${this.apiUrl}/${groupId}/tables/assign`,
      null,
      {
        params: {
          tableNumber: tableNumber.toString(),
          count: count.toString(),
        },
      }
    );
  }
}
