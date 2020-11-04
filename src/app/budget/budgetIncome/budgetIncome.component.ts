import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BudgetIncomeType } from '../../_models/budgetIncomeType';
import { Income } from '../../_models/Income';
import { BudgetIncomeService } from '../../_services/budgetIncome.service';

@Component({
  selector: 'app-budgetIncome',
  templateUrl: './budgetIncome.component.html',
  styleUrls: ['./budgetIncome.component.scss'],
})
export class BudgetIncomeComponent implements OnInit {
  constructor(private budgetIncomeServices: BudgetIncomeService) {}

  @Input('budgetType') budgetType: String;
  @Output() incomeChangeEvent = new EventEmitter<Income[]>();
  newIncomeType: string; 
  incomeAmount: number; 
  existingIncomeType: string; 
  disable: boolean;
  userId: number;
  customIncomes: any = [];
  newIncomes: any = [{ newIncomeType: '', incomeAmount: undefined }];
  existingIncomes: any = [{ existingIncomeType: '', incomeAmount: 0 }];
  incomeList: Income[] = [];

  incomeTypes: BudgetIncomeType[] = [
    { name: 'Alimony' },
    { name: 'Pay Check' },
    { name: 'Unemployment Benefits' },
    { name: 'Bonus' },
    { name: 'Child Support' },
    { name: 'Disability Benefits' },
    { name: 'Gambling income' },
    { name: 'Gift Income' },
    { name: 'Interest and Dividends' },
    { name: 'Jury Duty Pay' },
  ];


  ngOnInit() {
    this.budgetType = null;
    this.disable = true;
    this.userId = Number(localStorage.getItem('userId'));
    this.getIncomeDetails();
  }

  addCustomIncome(): void {
    this.customIncomes.push({ customType: undefined, incomeAmount: undefined, id: undefined });
  }

  addNewIncome(): void {
    this.newIncomes.push({ newIncomeType: '', incomeAmount: undefined, id: undefined });
  }

  emitIncomeEvent() {
    this.incomeList = [];
    this.newIncomes.forEach((i) => {
      const income = new Income();
      income.Amount = i.incomeAmount;
      income.IncomeType = i.newIncomeType;
      income.UserId = this.userId;
      income.Id = i.id;
      this.incomeList.push(income);
    });

    this.customIncomes.forEach((i) => {
      const income = new Income();
      income.Amount = i.incomeAmount;
      income.IncomeType = i.customType;
      income.UserId = this.userId;
      income.Id = i.id;
      this.incomeList.push(income);
    });
    this.incomeChangeEvent.emit(this.incomeList);
  }

  getIncomeDetails(){
    this.removeNewIncome(0);
    this.budgetIncomeServices.getAllIncomeByUser(this.userId)
    .subscribe(
      res =>
      {
        this.incomeList = res;
        this.incomeList.forEach(
          item => {
            if(item.incomeType in this.incomeTypes){
              this.newIncomes.push({newIncomeType: item.incomeType, incomeAmount: item.amount, id: item.id});
              this.emitIncomeEvent();
            }
            else{
              this.customIncomes.push({ customType: item.incomeType, incomeAmount: item.amount, id: item.id});
              this.emitIncomeEvent();
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

  removeCustomIncome(i: number) {
    this.customIncomes.splice(i, 1);
    this.emitIncomeEvent();
  }

  removeNewIncome(i: number) {
    this.newIncomes.splice(i, 1);
    this.emitIncomeEvent();
  }

  disableField(): boolean {
    if (this.budgetType === null) {
      return this.disable;
    } else {
      this.disable = false;
    }

    return this.disable;
  }

  getAllIncomeByUser() {
    const userId = Number(localStorage.getItem('userId'));
    //needs a .subscribe
    let incomes = this.budgetIncomeServices.getAllIncomeByUser(userId);
    incomes.forEach((element) => {
      console.log(element);
    });
  }
}
