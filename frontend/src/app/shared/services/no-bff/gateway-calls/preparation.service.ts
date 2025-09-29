import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
  Preparation,
  PreparationCreation,
} from '../../../../core/models/preparation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreparationService {
  private apiUrl: string = environment.apiUrl + '/kitchen';

  constructor(private http: HttpClient) {}

  public getPreparation(preparationId: string): Observable<Preparation> {
    return this.http.get<Preparation>(
      `${this.apiUrl}/preparations/${preparationId}`
    );
  }

  public getPreparations(): Observable<Preparation[]> {
    return this.http.get<Preparation[]>(`${this.apiUrl}/preparations`);
  }

  public createPreparation(
    preparation: PreparationCreation
  ): Observable<Preparation> {
    return this.http.post<Preparation>(
      `${this.apiUrl}/preparations`,
      preparation
    );
  }
}
