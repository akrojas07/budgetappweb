import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Savings } from '../_models/Savings';
import { Expenses} from '../_models/Expenses';
import { Income } from '../_models/Income';
import { BudgetUserBreakdown } from '../_models/budgetUserBreakdown';
import { UserService } from '../_services/user.service';
import { BudgetService } from '../_services/budget.service'; 


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
  hide: boolean; 
  budgetBreakdown: BudgetUserBreakdown;

  hasPopulatedBudgetType: boolean;
  
  constructor(private userService: UserService, private budgetService: BudgetService){}

  @ViewChild('ze') ze: ElementRef;

  ngOnInit() {
    this.savingAmount = 0.00;
    this.expenseAmount = 0.00;
    this.incomeAmount = 0.00;
    this.targetSavingsAmount = 0;
    this.targetExpenseAmount = 0;
    this.hide = true; 
    this.budgetBreakdown = new BudgetUserBreakdown();

    this.checkPopulatedBudgetType();
  }

  // maybe?
  loggedIn(){
    return this.userService.loggedIn();
  }

  checkPopulatedBudgetType() : void{
    const userId =  Number(localStorage.getItem('userId'));
    this.budgetService.getBudgetBreakdownByUser(userId)
    .subscribe(res =>{
      console.log(res);
      if (res === null){
        this.hasPopulatedBudgetType = false;
      }

      this.hasPopulatedBudgetType = true;
    }, error => {
      console.log(error);
      this.hasPopulatedBudgetType = false;
    });
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
    this.hide = true;
    // this.ze.nativeElement.style = 'visibility: hidden';
  }

  showInputBox(){
    this.hide = false;
    // this.ze.nativeElement.style = 'visibility: visible';
  }

  updateTargetSavings(){
    if(this.hide == true)
    {
      this.targetSavingsAmount = (this.incomeAmount * .2);
    }
    else
    {
      this.targetSavingsAmount = (this.incomeAmount * (this.budgetBreakdown.savings / 100));
    }

  }

  updateTargetExpenses(){
    // if(this.ze.nativeElement.style == 'visibility:hidden')
    if(this.hide == true)
    {
      this.targetExpenseAmount = this.incomeAmount * .8;
    }
    else
    {
      this.targetExpenseAmount = (this.incomeAmount * (this.budgetBreakdown.expenses / 100));
    }

  }
}
