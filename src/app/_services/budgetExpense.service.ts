import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expenses } from '../_models/Expenses';

@Injectable({
  providedIn: 'root'
})
export class BudgetExpenseService {
  baseUrl = environment.budgetApiUrl;
  constructor(private http: HttpClient) { }

  addNewExpense(model: Expenses){
    return this.http.post(this.baseUrl + 'expenses/addnewexpense', model);
  }

  upsertExpense(model: Expenses[]){
    // this translates it over to json
    const body = { Expenses: model };
    return this.http.put(this.baseUrl + 'expenses', body);
  }

  getAllExpensesByUser(userId: number){
    return this.http.get<Expenses[]>(this.baseUrl + 'expenses/' + userId);
  }

  updateIncome(model: Expenses){
    return this.http.patch(this.baseUrl + 'expenses', model);
  }

  removeIncome(expenseId: number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { ExpenseId : expenseId}
    };

    return this.http.delete(this.baseUrl + 'expenses', options);
  }

}
