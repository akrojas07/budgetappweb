import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budgetExpenses',
  templateUrl: './budgetExpenses.component.html',
  styleUrls: ['./budgetExpenses.component.scss']
})
export class BudgetExpensesComponent implements OnInit {

  constructor() { }


  customExpenses: any =[];

  newExpenses: any =[];


  ngOnInit() {
  }

 
  
  addCustomExpense(): void{
    this.customExpenses.push({ customType: undefined });
  }

  addNewExpense(): void{
    this.newExpenses.push({newExpenseType: undefined});
  }


}
