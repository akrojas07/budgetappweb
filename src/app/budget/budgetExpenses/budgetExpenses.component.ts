import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Expenses } from '../../_models/Expenses';

@Component({
  selector: 'app-budgetExpenses',
  templateUrl: './budgetExpenses.component.html',
  styleUrls: ['./budgetExpenses.component.scss']
})
export class BudgetExpensesComponent implements OnInit {

  constructor() { }
  @Input('budgetType') budgetType: String;
  @Output() expensesEventEmit = new EventEmitter<Expenses[]>();

  disable: boolean;
  customExpenses: any = [];
  newExpenses: any = [{newExpenseType: '', expenseAmount: undefined}];


  ngOnInit() {
    this.budgetType = null;
    this.disable = true;
  }
  
  addCustomExpense(): void{
    this.customExpenses.push({ customType: undefined, expenseAmount: undefined });
  }

  addNewExpense(): void{
    this.newExpenses.push({newExpenseType: '', expenseAmount: undefined});
  }


  emitExpenseEvent(){
    const expenseList: Expenses[] = [];

    this.newExpenses.forEach(e => {
      const expense = new Expenses();
      expense.ExpenseAmount = e.expenseAmount;
      expense.ExpenseType = e.newExpenseType;
      expenseList.push(expense);
    });

    this.customExpenses.forEach(e => {
      const expense = new Expenses();
      expense.ExpenseAmount = e.expenseAmount;
      expense.ExpenseType = e.customType; 
      expenseList.push(expense);
    });

    this.expensesEventEmit.emit(expenseList);
  }

  disableField(): boolean{ 
    if(this.budgetType === null){
      return this.disable;
    }
    else{
      this.disable = false;
    }

    return this.disable; 
  }
}
