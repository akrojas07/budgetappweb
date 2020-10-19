import { Component, OnInit } from '@angular/core';
import { BudgetIncomeType } from '../../_models/budgetIncomeType';

@Component({
  selector: 'app-budgetIncome',
  templateUrl: './budgetIncome.component.html',
  styleUrls: ['./budgetIncome.component.scss']
})
export class BudgetIncomeComponent implements OnInit {

  constructor() { }

  customIncomes: any = [];
  newIncomes: any = [];


  incomeSelect:BudgetIncomeType; 
 

  incomeTypes = [
    { id: 1, name: 'Alimony' },
    { id: 2, name: 'Pay Check' },
    { id: 3, name: 'Unemployment Benefits' },
    { id: 4, name: 'Bonus' },
    { id: 5, name: 'Child Support' },
    { id: 6, name: 'Disability Benefits' },
    { id: 7, name: 'Gambling income' },
    { id: 8, name: 'Gift Income' },
    { id: 9, name: 'Interest and Dividends' },
    { id: 10, name: 'Jury Duty Pay' },
  ];

  ngOnInit() {
  }

  addCustomIncome(): void{
    this.customIncomes.push({ customType: undefined });
  }
  

  addNewIncome(): void{
    this.newIncomes.push({newIncomeType: undefined});
  }



}
