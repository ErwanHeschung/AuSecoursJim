import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Menu } from '../../../models/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl: string = environment.apiUrl + '/menu';
  private menus$: Observable<Menu[]> | null = null;

  constructor(private http: HttpClient) {}

  public getAllMenus(): Observable<Menu[]> {
    if (!this.menus$) {
      this.menus$ = this.http
        .get<Menu[]>(`${this.apiUrl}/menus`)
        .pipe(shareReplay(1));
    }
    return this.menus$;
  }

  public clearCache() {
    this.menus$ = null;
  }
}
