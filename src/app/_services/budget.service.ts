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

hasPopulatedBudgetType(): any{
  const userId =  Number(localStorage.getItem('userId'));
  this.getBudgetBreakdownByUser(userId)
  .subscribe(res =>{
    console.log(res);
    if (res === null){
      return false;
    }

    return true;
  }, error => {
    return false;
  });
  
}

addNewBudgetBreakdown(){

}

getBudgetBreakdownByUser(userId: number) : Observable<BudgetBreakdown>{
  return this.http.get<BudgetBreakdown>(this.baseUrl + 'budget/breakdown/breakdown/'+ userId);
  

}

getBudgetTypeByUser(){

}

updateBudgetBreakdownByUser(){

}

removeBudgetBreakdown(){

}

}
