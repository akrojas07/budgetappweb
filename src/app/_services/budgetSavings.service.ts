import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SavingResponse } from '../_models/SavingResponse';
import { SavingsRequest } from '../_models/SavingsRequest'; 

@Injectable({
  providedIn: 'root'
})
export class BudgetSavingsService {
  baseUrl = environment.budgetApiUrl;
  constructor(private http: HttpClient) { }

  // addNewSaving(model: Savings) : Observable<any>{
  //   return this.http.post(this.baseUrl + 'savings', model);
  // }

  upsertSavings(model: SavingsRequest[]): Observable<any>{
    const body = { Savings: model };
    return this.http.put(this.baseUrl + 'savings', body);
  }

  getAllSavingsByUser(userId: number): Observable<SavingResponse[]>{
    return this.http.get<SavingResponse[]>(this.baseUrl + 'savings/' + userId);
  }

  // updateSavings(model: Savings){
  //   return this.http.patch(this.baseUrl + 'savings', model);
  // }

  // removeSavings(savingsId: number){
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     body: { SavingsId : savingsId}
  //   };

  //   return this.http.delete(this.baseUrl + 'savings', options);
  // }
}
