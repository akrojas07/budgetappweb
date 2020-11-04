import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Income } from '../_models/Income';

@Injectable({
  providedIn: 'root'
})
export class BudgetIncomeService {
  baseUrl = environment.budgetApiUrl;
  constructor(private http: HttpClient) { }

  addNewIncome(model: Income) : Observable<any>{
    return this.http.post(this.baseUrl + 'income', model);
  }

  upsertIncomes(model: Income[]){
    const body = { Incomes: model };
    return this.http.put(this.baseUrl + 'income', body);
  }

  getAllIncomeByUser(userId: number){
    return this.http.get<Income[]>(this.baseUrl + 'income/' + userId);
  }

  updateIncome(model: Income){
    return this.http.patch(this.baseUrl + 'income', model);
  }

  removeIncome(incomeId: number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { IncomeId : incomeId}
    };

    return this.http.delete(this.baseUrl + 'income', options);
  }
}
