import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Item } from '../../../../core/models/item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl: string = environment.apiUrl + '/menu';
  private menus$: Observable<Item[]> | null = null;

  constructor(private http: HttpClient) {}

  public getAllMenus(): Observable<Item[]> {
    if (!this.menus$) {
      this.menus$ = this.http
        .get<Item[]>(`${this.apiUrl}/menus`)
        .pipe(shareReplay(1));
    }
    return this.menus$;
  }

  public clearCache() {
    this.menus$ = null;
  }
}
