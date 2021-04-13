import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { SavingsRequest } from '../_models/SavingsRequest';
import { ExpensesRequest } from '../_models/ExpensesRequest';
import { IncomeRequest } from '../_models/IncomeRequest';
import { BudgetBreakdown } from '../_models/BudgetBreakdown';

import { UserService } from '../_services/user.service';
import { BudgetService } from '../_services/budget.service';
import { BudgetIncomeService } from '../_services/budgetIncome.service';
import { BudgetExpenseService } from '../_services/budgetExpense.service';
import { BudgetSavingsService } from '../_services/budgetSavings.service';

@Component({
  selector: 'app-Budget',
  templateUrl: './Budget.component.html',
  styleUrls: ['./Budget.component.scss'],
})
export class BudgetComponent implements OnInit {
  savingAmount: number;
  savingsList: SavingsRequest[] = [];
  targetSavingsAmount: number;

  expenseAmount: number;
  expenseList: ExpensesRequest[] = [];
  targetExpenseAmount: number;

  incomeAmount: number;
  incomeList: IncomeRequest[] = [];

  userId: number;
  total: number;
  successMessage: string;
  errorMessage: string;

  hide: boolean;
  enableSubmit: boolean;
  enableUpdate: boolean;
  hasPopulatedBudgetType: boolean;
  showSuccessMessage: boolean;
  showErrorMessage: boolean;

  budgetBreakdown: BudgetBreakdown;

  savingsSubscription = Subscription;
  getBudgetTypeSubscription = Subscription;

  constructor(
    private userService: UserService,
    private budgetService: BudgetService,
    private incomeService: BudgetIncomeService,
    private expenseService: BudgetExpenseService,
    private savingsService: BudgetSavingsService
  ) {}

  @ViewChild('ze') ze: ElementRef;
  @ViewChild('radioToggle') radioToggle: ElementRef;

  ngOnInit() {
    this.savingAmount = 0.0;
    this.expenseAmount = 0.0;
    this.incomeAmount = 0.0;
    this.targetSavingsAmount = 0;
    this.targetExpenseAmount = 0;
    this.hide = true;
    this.enableSubmit = false;
    this.enableUpdate = false;
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.budgetBreakdown = new BudgetBreakdown();
    this.userId = Number(localStorage.getItem('userId'));
    this.getBudgetBreakdown();
  }

  loggedIn() {
    return this.userService.loggedIn();
  }

  //pull information start

  getBudgetBreakdown() {
    this.budgetService.getBudgetBreakdownByUser(this.userId).subscribe(
      (res) => {
        if (res !== null) {
          if (res.budgetType !== 'fifty') {
            this.radioToggle.nativeElement.click();
          }
          this.budgetBreakdown = res;
          this.checkPopulatedBudgetType();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkPopulatedBudgetType(): void {
    if (this.budgetBreakdown.budgetType === undefined) {
      this.hasPopulatedBudgetType = false;
    } else {
      this.hasPopulatedBudgetType = true;
    }
  }

  populateIncomeList(event: IncomeRequest[]): void {
    // clear income list after each event - only get the latest
    this.incomeList = [];
    for (let income of event) {
      this.incomeList.push(income);
    }
  }

  populateExpenseList(event: ExpensesRequest[]): void {
    this.expenseList = [];
    for (let expense of event) {
      this.expenseList.push(expense);
    }
  }

  populateSavingsList(event: SavingsRequest[]): void {
    this.savingsList = [];
    for (let saving of event) {
      this.savingsList.push(saving);
    }
  }

  //pull information end

  //enable features

  enableSubmitButton(event: ExpensesRequest[]) {
    for (let i = 0; i < event.length; i++) {
      let expense = event[i].Amount;
      if (
        expense === undefined ||
        expense === 0 ||
        event[i].ExpenseType === ''
      ) {
        this.enableSubmit = false;
        break;
      }
      this.enableSubmit = true;
    }
  }

  setFiftyBudgetDefault() {
    if (this.hide === true) {
      this.budgetBreakdown.expensesBreakdown = 80;
      this.budgetBreakdown.savingsBreakdown = 20;
    }
  }
  //net worth methods

  recalculateSavings(event: SavingsRequest[]): void {
    this.savingAmount = 0.0;
    for (let i = 0; i < event.length; i++) {
      this.savingAmount += event[i].Amount;
    }

    this.recalculateNetWorth();
    this.populateSavingsList(event);
  }

  recalculateExpenses(event: ExpensesRequest[]): void {
    this.expenseAmount = 0.0;
    for (let i = 0; i < event.length; i++) {
      this.expenseAmount += event[i].Amount;
    }
    this.recalculateNetWorth();
    this.populateExpenseList(event);
    this.enableSubmitButton(event);
  }

  recalculateIncome(event: IncomeRequest[]): void {
    this.incomeAmount = 0.0;
    for (let i = 0; i < event.length; i++) {
      this.incomeAmount += event[i].Amount;
    }
    this.budgetBreakdown.income = this.incomeAmount;
    this.recalculateNetWorth();
    this.populateIncomeList(event);
  }

  recalculateNetWorth(): void {
    this.total = this.incomeAmount + this.savingAmount - this.expenseAmount;
    this.updateTargetExpenses();
    this.updateTargetSavings();
  }

  //end net worth methods

  //update targets start
  updateTargetSavings() {
    if (this.hide === true) {
      this.targetSavingsAmount = this.incomeAmount * 0.2;
    } else {
      this.targetSavingsAmount =
        this.incomeAmount * (this.budgetBreakdown.savingsBreakdown / 100);
    }
  }

  updateTargetExpenses() {
    if (this.hide === true) {
      this.targetExpenseAmount = this.incomeAmount * 0.8;
    } else {
      this.targetExpenseAmount =
        this.incomeAmount * (this.budgetBreakdown.expensesBreakdown / 100);
    }
  }
  //update targets end

  // make inputs box visible start

  hideInputBox() {
    this.hide = true;
  }

  showInputBox() {
    this.hide = false;
  }

  //make inputs box visible end

  refresh(): void {
    window.location.reload();
  }

  // submit information start
  onSubmit() {
    this.setFiftyBudgetDefault();
    this.budgetBreakdown.userId = this.userId;

    if (this.expenseList.length === 0) {
      this.showSuccessMessage = false;
      this.errorMessage = 'Please review your expense entries and try again';
      this.showErrorMessage = true;
    } else {
      this.expenseService.upsertExpense(this.expenseList).subscribe(
        (res) => {
          if (this.savingsList.length === 0) {
            this.showSuccessMessage = false;
            this.errorMessage =
            'Please review your savings entries and try again';
            this.showErrorMessage = true;
          } else {
            this.savingsService.upsertSavings(this.savingsList).subscribe(
              (res) => {
                if (this.incomeList.length === 0) {
                  this.showSuccessMessage = false;
                  this.errorMessage = 'Please review your income entries and try again';
                  this.showErrorMessage = true;
                } else {
                  this.incomeService.upsertIncomes(this.incomeList).subscribe(
                    (res) => {
                      if (this.budgetBreakdown.id === undefined || this.budgetBreakdown.id === 0) {
                        this.budgetService.addNewBudgetBreakdown(this.budgetBreakdown)
                        .subscribe(
                          (res) => {
                            this.showErrorMessage = false;
                            this.successMessage = 'Submit Successful';
                            this.showSuccessMessage = true;
                            setTimeout(this.refresh, 3000);
                          },
                          (error) => {
                            console.log(error);
                            this.errorMessage = 'Please review your budget breakdowns and try again ';
                            this.showErrorMessage = true;
                            this.showSuccessMessage = false;
                          }
                        );
                      } else {
                        this.budgetService.updateBudgetBreakdownByUser(this.budgetBreakdown)
                        .subscribe(
                          (res) => {
                            this.successMessage = 'Update Successful';
                            this.showSuccessMessage = true;
                            this.showErrorMessage = false;
                            setTimeout(this.refresh, 3000);
                          },
                          (error) => {
                            console.log(error);
                            this.errorMessage = 'Please review your budget breakdowns and try again ';
                            this.showErrorMessage = true;
                            this.showSuccessMessage = false;
                          }
                        );
                      }
                    },
                    (err) => {
                      this.showSuccessMessage = false;
                      this.errorMessage = 'Please review your income entries and try again';
                      this.showErrorMessage = true;
                      
                    }
                  );
                }
              },
              (error) => {
                this.showSuccessMessage = false;
                this.errorMessage =
                  'Please review your savings entries and try again';
                this.showErrorMessage = true;
              }
            );
          }
        },
        (err) => {
          this.showSuccessMessage = false;
          this.errorMessage =
            'Please review your expense entries and try again';
          this.showErrorMessage = true;
        }
      );
    }
  }
  //submit information end
}
