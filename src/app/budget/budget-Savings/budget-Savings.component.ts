import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {Savings} from '../../_models/Savings';

@Component({
  selector: 'app-budget-Savings',
  templateUrl: './budget-Savings.component.html',
  styleUrls: ['./budget-Savings.component.scss']
})
export class BudgetSavingsComponent implements OnInit {

  constructor() { }
  @Input('budgetType') budgetType: String;
  @Output() savingsChangeEvent = new EventEmitter<Savings[]>();

  disable: boolean;
  customSavings: any = [];
  newSavings: any = [{newSavingsType: '', savingsAmount: undefined}];

  ngOnInit() {
    this.budgetType = null;
    this.disable = true;
  }


  addCustomSaving(): void{
    this.customSavings.push({ customType: undefined, savingsAmount: undefined });
  }


  addNewSaving(): void{
    this.newSavings.push({newSavingsType: '', savingsAmount: undefined});
  }

  emitSavingsEvent(){
    let savingsList : Savings[] = [];

    this.newSavings.forEach(s =>{
      let savings = new Savings();
      savings.savingsType = s.newSavingsType;
      savings.savingsAmount = s.savingsAmount;
      savingsList.push(savings);
    });

    this.customSavings.forEach(c =>{
      let savings = new Savings();
      savings.savingsType = c.customType;
      savings.savingsAmount = c.savingsAmount;
      savingsList.push(savings);
    })

    this.savingsChangeEvent.emit(savingsList);
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
