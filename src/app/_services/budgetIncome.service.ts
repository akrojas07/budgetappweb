import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IncomeRequest } from '../_models/IncomeRequest';
import { IncomeResponse } from '../_models/IncomeResponse';

@Injectable({
  providedIn: 'root'
})
export class BudgetIncomeService {
  baseUrl = environment.budgetApiUrl;
  constructor(private http: HttpClient) { }

  // addNewIncome(model: Income) : Observable<any>{
  //   return this.http.post(this.baseUrl + 'income', model);
  // }

  upsertIncomes(model: IncomeRequest[]){
    const body = { Incomes: model };
    return this.http.put(this.baseUrl + 'income', body);
  }

  getAllIncomeByUser(userId: number): Observable<IncomeResponse[]>{
    return this.http.get<IncomeResponse[]>(this.baseUrl + 'income/' + userId);
  }

  // updateIncome(model: Income){
  //   return this.http.patch(this.baseUrl + 'income', model);
  // }

  // removeIncome(incomeId: number){
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     body: { IncomeId : incomeId}
  //   };

  //   return this.http.delete(this.baseUrl + 'income', options);
  // }
}
