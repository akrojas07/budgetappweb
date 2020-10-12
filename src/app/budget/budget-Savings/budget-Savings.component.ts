import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-Savings',
  templateUrl: './budget-Savings.component.html',
  styleUrls: ['./budget-Savings.component.scss']
})
export class BudgetSavingsComponent implements OnInit {

  constructor() { }


  customSavings: any = [];

  newSavings: any = [];

  ngOnInit() {
  }


  addCustomSaving(): void{
    this.customSavings.push({ customType: undefined });
  }


  addNewSaving(): void{
    this.newSavings.push({newSavingsType: undefined});
  }
}
