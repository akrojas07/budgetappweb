import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SavingsRequest } from 'src/app/_models/SavingsRequest';
import {BudgetSavingsService} from '../../_services/budgetSavings.service';

@Component({
  selector: 'app-budget-Savings',
  templateUrl: './budget-Savings.component.html',
  styleUrls: ['./budget-Savings.component.scss']
})
export class BudgetSavingsComponent implements OnInit {

  constructor(private savingsService: BudgetSavingsService) { }

  @Input('budgetType') budgetType: String;
  @Output() savingsChangeEvent = new EventEmitter<SavingsRequest[]>();

  disable: boolean;
  userId: number;
  customSavings: any = [{customType: undefined, savingsAmount: undefined, id: undefined}];
  newSavings: any = [{newSavingsType: '', savingsAmount: undefined, id: undefined}];
  savingsRequestsList : SavingsRequest[] = [];

  savingsTypes=
  [
    { id: 1, name: 'Deposit Savings' },
    { id: 2, name: 'Money Market Account'},
    { id: 3, name: 'Certificate of Deposit (CD)'},
    { id: 4, name: 'Treasury Bill'},
    { id: 5, name: 'Bonds'},
    { id: 6, name: 'Employer Sponsored'}

  ]

  ngOnInit() {
    this.budgetType = null;
    this.disable = true;
    this.userId = Number(localStorage.getItem('userId'));
    this.getSavingsDetails();
  }


  addCustomSaving(): void{
    this.customSavings.push({ customType: undefined, savingsAmount: undefined, id: undefined });
  }


  addNewSaving(): void{
    this.newSavings.push({newSavingsType: '', savingsAmount: undefined, id: undefined});
  }

  emitSavingsEvent(){
    this.savingsRequestsList = [];

    this.newSavings.forEach(s =>{
      let savings = new SavingsRequest();
      savings.SavingType = s.newSavingsType;
      savings.Amount = s.savingsAmount;
      savings.UserId = this.userId;
      savings.Id = s.id;
      this.savingsRequestsList.push(savings);
    });

    this.customSavings.forEach(c =>{
      let savings = new SavingsRequest();
      savings.SavingType = c.customType;
      savings.Amount = c.savingsAmount;
      savings.UserId = this.userId;
      savings.Id = c.id;
      this.savingsRequestsList.push(savings);
    })
    this.savingsChangeEvent.emit(this.savingsRequestsList);
  }

  getSavingsDetails(): void{
    this.removeNewSaving(0);
    this.removeCustomSaving(0);

    this.savingsService.getAllSavingsByUser(this.userId)
    .subscribe(
      responseSavings =>
      {
        responseSavings.forEach(
          item => {

            if(item.savingsType in this.savingsTypes){
              this.newSavings.push({newSavingsType: item.savingsType, savingsAmount: item.savingsAmount, id: item.id});
              this.emitSavingsEvent();
            }
            else{
              this.customSavings.push( {customType:  item.savingsType, savingsAmount: item.savingsAmount, id: item.id} );
              this.emitSavingsEvent();
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

  removeNewSaving(i: number): void{
    this.newSavings.splice(i,1);
    this.emitSavingsEvent();
  }
  removeCustomSaving(i: number): void{
    this.customSavings.splice(i, 1);
    this.emitSavingsEvent();
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
