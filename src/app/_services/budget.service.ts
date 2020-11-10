import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BudgetBreakdown} from '../_models/BudgetBreakdown';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  baseUrl = environment.budgetApiUrl;
  constructor(private http: HttpClient) { }

  addNewBudgetBreakdown(model: BudgetBreakdown){
    return this.http.post(this.baseUrl +'breakdown/newbreakdown', model);
  }

  getBudgetBreakdownByUser(userId: number) : Observable<BudgetBreakdown>{
    return this.http.get<BudgetBreakdown>(this.baseUrl + 'breakdown/' + userId);
  }

  getBudgetTypeByUser(userId: number): Observable<string>{
    return this.http.get<string>(this.baseUrl + 'breakdown/budgettype/'+ userId);
  }

  updateBudgetBreakdownByUser(model: BudgetBreakdown){
    return this.http.patch(this.baseUrl +'breakdown/updatebreakdown', model);
  }

  //only gets called when user is removing existing line items already in the db
  //will need child input 
  removeBudgetBreakdown(model: any){
    return this.http.delete(this.baseUrl + 'breakdown/removebreakdown', model);
  }

}
