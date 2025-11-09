import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../../../core/models/group.model';
import { environment } from '../../../../environments/environment';
import { Item } from '../../../core/models/item.model';

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
}
