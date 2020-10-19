import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NetWorthCalculator } from '../_models/netWorthCalculator';
import { BudgetIncomeComponent} from '../budget/budgetIncome/budgetIncome.component';
import { BudgetSavingsComponent } from './budget-Savings/budget-Savings.component';
import { BudgetExpensesComponent } from './budgetExpenses/budgetExpenses.component';

@Component({
  selector: 'app-Budget',
  templateUrl: './Budget.component.html',
  styleUrls: ['./Budget.component.scss']
})
export class BudgetComponent implements OnInit {

  inputsForm: FormGroup; 

  @ViewChild(BudgetIncomeComponent) income: BudgetIncomeComponent;
  @ViewChild(BudgetSavingsComponent) savings: BudgetSavingsComponent;
  @ViewChild(BudgetExpensesComponent) expenses: BudgetExpensesComponent;

  savingsAmount: number = undefined;


  ngOnInit() {

  }

  onSubmit(){

  }

  recalculateSavings(event: any){
    console.log(event);
    this.savingsAmount = 100;
  }

}
