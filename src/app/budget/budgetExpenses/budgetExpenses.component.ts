import { unescapeIdentifier } from '@angular/compiler';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ExpensesRequest } from '../../_models/ExpensesRequest';
import { BudgetExpenseService } from '../../_services/budgetExpense.service';

@Component({
  selector: 'app-budgetExpenses',
  templateUrl: './budgetExpenses.component.html',
  styleUrls: ['./budgetExpenses.component.scss']
})
export class BudgetExpensesComponent implements OnInit {

  constructor(private expenseService: BudgetExpenseService) { }
  @Input('budgetType') budgetType: String;
  @Output() expensesEventEmit = new EventEmitter<ExpensesRequest[]>();

  disable: boolean;
  customExpenses: any = [];
  newExpenses: any = [{newExpenseType: '', expenseAmount: undefined}];
  userId: number;
  expenseList: ExpensesRequest[] = [];

  expenseTypes=
  [
    { id: 1, name: 'Housing' },
    { id: 2, name: 'Groceries'},
    { id: 3, name: 'Internet'},
    { id: 4, name: 'Mobile Phone'},
    { id: 5, name: 'Gas and Electric'},
    { id: 6, name: 'Water'},
    { id: 7, name: 'Gasoline'},
    { id: 8, name: 'Health Insurance Premium'},
    { id: 9, name: 'Clothing'},
    { id: 10, name: 'Laundry'},

  ]
  
  ngOnInit() {
    this.budgetType = null;
    this.disable = true;
    this.userId = Number(localStorage.getItem('userId'));
    this.getExpenseDetails();
  }
  
  addCustomExpense(): void{
    this.customExpenses.push({ customType: undefined, expenseAmount: undefined, id: undefined });
  }

  addNewExpense(): void{
    this.newExpenses.push({newExpenseType: '', expenseAmount: undefined, id:undefined});
  }


  emitExpenseEvent(){
    this.expenseList = [];

    this.newExpenses.forEach(e => {
      const expense = new ExpensesRequest();
      expense.Amount = e.expenseAmount;
      expense.ExpenseType = e.newExpenseType;
      expense.UserId = this.userId;
      expense.Id = e.id;
      this.expenseList.push(expense);
    });

    this.customExpenses.forEach(e => {
      const expense = new ExpensesRequest();
      expense.Amount = e.expenseAmount;
      expense.ExpenseType = e.customType; 
      expense.UserId = this.userId;
      expense.Id = e.id;
      this.expenseList.push(expense);
    });

    this.expensesEventEmit.emit(this.expenseList);
  }

  getExpenseDetails(): void{
    this.removeNewExpense(0);
    this.expenseService.getAllExpensesByUser(this.userId)
    .subscribe(
      responseExpense =>
      {

        responseExpense.forEach(
          item => {
            if(item.expenseType in this.expenseTypes){
            this.newExpenses.push({newExpenseType: item.expenseType, expenseAmount: item.expenseAmount, id: item.id});
            this.emitExpenseEvent();

          }
          else{
            this.customExpenses.push({ customType: item.expenseType, expenseAmount: item.expenseAmount, id: item.id});
            this.emitExpenseEvent();
          }

          }
        );

      },
      err =>
      {
        console.log(err);
      }
    );

  }

  removeNewExpense(i: number){
    this.newExpenses.splice(i,1);
    this.emitExpenseEvent();
  }
  removeCustomExpense(i:number){
    this.customExpenses.splice(i, 1); 
    this.emitExpenseEvent();
    
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
