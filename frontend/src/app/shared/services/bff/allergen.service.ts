import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Allergen } from '../../../core/models/allergen.model';
import { IAllergenService } from '../../../core/models/interfaces/allergen';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AllergenServiceBFF implements IAllergenService {
  private apiUrl: string = environment.apiUrl + '/allergen';

  constructor(private http: HttpClient) {}

  getAllergens(): Observable<Allergen[]> {
    return this.http.get<Allergen[]>(`${this.apiUrl}`);
  }
}
