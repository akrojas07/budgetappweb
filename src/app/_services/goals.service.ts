import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GoalsRequest } from '../_models/GoalsRequest';
import { GoalsResponse } from '../_models/GoalsResponse';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  baseUrl = environment.goalApiUrl;

  constructor(private http: HttpClient) { }

  getGoals(userId: number): Observable<GoalsResponse[]>{
    return this.http.get<GoalsResponse[]>(this.baseUrl + userId);
  }

  upsertGoals(model: GoalsRequest[]): Observable<any>{
    const body = {UpsertGoals: model};
    return this.http.put(this.baseUrl, body);
  }
}
