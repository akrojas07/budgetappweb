import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BudgetIncomeType } from '../../_models/budgetIncomeType';
import { Income } from '../../_models/Income';

@Component({
  selector: 'app-budgetIncome',
  templateUrl: './budgetIncome.component.html',
  styleUrls: ['./budgetIncome.component.scss']
})
export class BudgetIncomeComponent implements OnInit {

  constructor() { }
  @Input('budgetType') budgetType: String;
  @Output() incomeChangeEvent = new EventEmitter<Income[]>();

  disable: boolean;
  customIncomes: any = [];
  newIncomes: any = [{newIncomeType: '', incomeAmount: undefined}];

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
    this.budgetType = null;
    this.disable = true;
  }

  addCustomIncome(): void{
    this.customIncomes.push({ customType: undefined, incomeAmount:undefined });
  }
  

  addNewIncome(): void{
    this.newIncomes.push({newIncomeType: '' , incomeAmount:undefined});
  }

  emitIncomeEvent(){
    const incomeList: Income[] = [];
    this.newIncomes.forEach(i => {
      const income = new Income(); 
      income.IncomeAmount = i.incomeAmount;
      income.IncomeType = i.newIncomeType;
      incomeList.push(income);
    });

    this.customIncomes.forEach(i => {
      const income = new Income();
      income.IncomeAmount = i.incomeAmount;
      income.IncomeType = i.customType;
      incomeList.push(income);
    });
    this.incomeChangeEvent.emit(incomeList);
  }

  removeCustomIncome(i:number){
    this.customIncomes.splice(i, 1); 
    this.emitIncomeEvent();
    
  }

  removeNewIncome(i:number){
    this.newIncomes.splice(i, 1); 
    this.emitIncomeEvent();
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
