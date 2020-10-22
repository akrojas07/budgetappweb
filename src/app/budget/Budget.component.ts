import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Savings } from '../_models/Savings';
import { Expenses} from '../_models/Expenses';
import { Income } from '../_models/Income';
import { BudgetUserBreakdown } from '../_models/budgetUserBreakdown';


@Component({
  selector: 'app-Budget',
  templateUrl: './Budget.component.html',
  styleUrls: ['./Budget.component.scss']
})
export class BudgetComponent implements OnInit {

  savingAmount: number;
  expenseAmount: number;
  incomeAmount: number;
  targetSavingsAmount: number;
  targetExpenseAmount: number;
  total: number;
  budgetBreakdown: BudgetUserBreakdown;
  

  @ViewChild('ze') ze: ElementRef;

  ngOnInit() {
    this.savingAmount = 0.00;
    this.expenseAmount = 0.00;
    this.incomeAmount = 0.00;
    this.targetSavingsAmount = 0;
    this.targetExpenseAmount = 0;
    this.budgetBreakdown = new BudgetUserBreakdown();
  }

  onSubmit(){

  }

  recalculateSavings(event: Savings[]){
    this.savingAmount = 0.00;
    for (let i = 0; i < event.length; i++){
      this.savingAmount +=  event[i].savingsAmount;
    }

    this.recalculateNetWorth();
  }

  recalculateExpenses(event: Expenses[]){
    this.expenseAmount = 0.00;

    for(let i=0; i < event.length; i++){
      this.expenseAmount += event[i].ExpenseAmount;
    }
    this.recalculateNetWorth();
  }

  recalculateIncome(event: Income[]){
    this.incomeAmount = 0.00;
    for(let i =0; i< event.length; i++){
      this.incomeAmount += event[i].IncomeAmount;
    }
    this.budgetBreakdown.income = this.incomeAmount;
    this.recalculateNetWorth();
  }

  recalculateNetWorth(){
    this.total = (this.incomeAmount + this.savingAmount) - this.expenseAmount;
    this.updateTargetExpenses();
    this.updateTargetSavings();
  }

  hideInputBox(){
    this.ze.nativeElement.style = 'visibility: hidden';
  }

  showInputBox(){
    this.ze.nativeElement.style = 'visibility: visible';
  }

  updateTargetSavings(){
    if(this.ze.nativeElement.style == 'visibility:hidden')
    {
      this.targetSavingsAmount = (this.incomeAmount * .2);
    }
    else
    {
      this.targetSavingsAmount = (this.incomeAmount * (this.budgetBreakdown.savings / 100));
    }

  }

  updateTargetExpenses(){
    if(this.ze.nativeElement.style == 'visibility:hidden')
    {
      this.targetExpenseAmount = this.incomeAmount * .3;
    }
    else
    {
      this.targetExpenseAmount = (this.incomeAmount * (this.budgetBreakdown.expenses / 100));
    }

  }
}
