import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budgetIncome',
  templateUrl: './budgetIncome.component.html',
  styleUrls: ['./budgetIncome.component.scss']
})
export class BudgetIncomeComponent implements OnInit {

  constructor() { }

  customIncomes: any = [];
  customExpenses: any =[];
  customSavings: any = [];
  newIncomes: any = [];
  newExpenses: any =[];
  newSavings: any = [];

  ngOnInit() {
  }

  addCustomIncome(): void{
    this.customIncomes.push({ customType: undefined });
  }
  

  addNewIncome(): void{
    this.newIncomes.push({newIncomeType: undefined});
  }



}
