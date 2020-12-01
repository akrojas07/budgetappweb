import { Component, OnInit, Output, EventEmitter, IterableDiffers } from '@angular/core';
import { GoalsService } from '../_services/goals.service';
import { BudgetExpenseService } from '../_services/budgetExpense.service';
import { BudgetSavingsService } from '../_services/budgetSavings.service';
import { BudgetService } from '../_services/budget.service';
import { BudgetIncomeService } from '../_services/budgetIncome.service';
import {
  ChartOptions,
  ChartType,
  ChartDataSets,
  TickOptions,
  ChartData,
} from 'chart.js';
import { Colors, Label, SingleDataSet } from 'ng2-charts';
import { GoalsResponse } from '../_models/GoalsResponse';
import { GoalsRequest } from '../_models/GoalsRequest';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  showSuccessMessage: boolean;
  showErrorMessage: boolean;
  showNoGoalsMessage: boolean;
  hide: boolean;

  successMessage: string;
  errorMessage: string;
  noGoalsMessage: string;
  sysdate = new Date().toLocaleDateString();

  goalsList: GoalsRequest[] = [];
  targetExpenseDataTotal: number;
  targetSavingsDataTotal: number;
  actualExpenseDataTotal = 0;
  actualSavingsDataTotal = 0;
  actualIncomeDataTotal = 0;
  targetDataArray: number[][] = [[], []];
  actualDataArray: number[] = [];
  expenseArrayLabel: string[] = [];
  savingsArrayLabel: string[] = [];
  expenseArrayAmount: number[] = [];
  savingsArrayAmount: number[] = [];
  userId: number;

  @Output() goals = new EventEmitter<GoalsRequest>();

  public barChartLabels1: Label[] = ['Savings', 'Expenses'];
  public barChartType1: ChartType = 'bar';
  public barChartLegend1 = true;
  public barChartPlugins1 = [];
  public barChartColors: Colors[] = [
    {
      backgroundColor: '#98d7c2',
    },
    {
      backgroundColor: '#90bbc2',
    },
  ];
  public barChartOptions1: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{ ticks: { min: 0 } }] },
    maintainAspectRatio: false
  };
  public barChartData1: ChartDataSets[] = [{label: 'Target', data: [500, 800]}, {label: 'Actual', data: [500, 800]}];


  public pieChartOptions1: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels1: Label[] = [];
  public pieChartData1: SingleDataSet = [];
  public pieChartType1: ChartType = 'pie';
  public pieChartLegend1 = true;
  public pieChartPlugins1 = [];
  public pieChartColors: Colors[] = [
    {
      backgroundColor: [
        '#82e4d0',
        '#cadfdf',
        '#90bbc2',
        '#98d7c2',
        '#248680',
        '#dedce1',
      ],
    },
  ];

  public pieChartOptions2: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels2: Label[] = [];
  public pieChartData2: SingleDataSet = [];
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];



  constructor(
    private goalsService: GoalsService,
    private expenseService: BudgetExpenseService,
    private savingsService: BudgetSavingsService,
    private incomeService: BudgetIncomeService,
    private budgetService: BudgetService
  ) {}

  ngOnInit() {
    this.showErrorMessage = false;
    this.showSuccessMessage = false;
    this.hide = true;
    this.userId = Number(localStorage.getItem('userId'));
    this.getGoalsList();
    this.getActualData();
    this.getIncomeData();
    this.getTargetData();
  }



  getGoalsList(): void {
    this.goalsList = [];
    this.goalsService.getGoals(this.userId).subscribe(
      (res) => {
        if (res !== null) {
          for (let i = 0; i < res.length; i++) {
            let goal = res[i];
            let progress = (goal.amount / goal.targetAmount) * 100;
            let timeRemaining = Math.abs(new Date(goal.endDate).getTime() - new Date(this.sysdate).getTime());

            this.goalsList.push({
              Id: goal.id,
              UserId: this.userId,
              GoalAmount: goal.amount,
              GoalName: goal.goalName,
              GoalSummary: goal.goalSummary,
              StartDate: goal.startDate,
              EndDate: goal.endDate,
              TargetAmount: goal.targetAmount,
              Progress: progress > 100 ? 100 : progress,
              DaysRemaining: Math.ceil(timeRemaining / (1000 * 3600 * 24))
            });
          }
        }
      },
      (error) => {
        this.noGoalsMessage = 'No Existing Goals';
        this.showNoGoalsMessage = true;

      }
    );
  }

  getActualData(): void {
    this.actualDataArray = [];
    this.savingsService.getAllSavingsByUser(this.userId).subscribe((res) =>
    {
      res.forEach((item) =>
      {
        this.actualSavingsDataTotal += item.savingsAmount;
        this.pieChartData2.push(item.savingsAmount);
        this.pieChartLabels2.push(item.savingsType);
      });
      this.actualDataArray.push(this.actualSavingsDataTotal);
    });

    this.expenseService.getAllExpensesByUser(this.userId).subscribe((res) => {
      res.forEach((item) =>
      {
        this.actualExpenseDataTotal += item.expenseAmount;
        this.pieChartLabels1.push(item.expenseType);
        this.pieChartData1.push(item.expenseAmount);
      });
      this.actualDataArray.push(this.actualExpenseDataTotal);
      this.barChartData1[[1][0]].data = [this.actualSavingsDataTotal, this.actualExpenseDataTotal];
    });
  }

  getTargetData(): void{
    this.budgetService.getBudgetBreakdownByUser(this.userId).subscribe(
      (res) =>
      {
        this.targetExpenseDataTotal = (res.expensesBreakdown / 100) * this.actualIncomeDataTotal;
        this.targetSavingsDataTotal = (res.savingsBreakdown / 100) * this.actualIncomeDataTotal;
        this.barChartData1[[0][0]].data = [this.targetSavingsDataTotal, this.targetExpenseDataTotal];
      }
    );
  }

  getIncomeData(): void
  {
    this.incomeService.getAllIncomeByUser(this.userId).subscribe(
      (res) => {
        res.forEach(item => this.actualIncomeDataTotal += item.amount);
      }
    );
  }


  refresh(): void {
    window.location.reload();
  }

  addGoal(event: GoalsRequest[]): void {
    this.goalsList = [];

    for (const goal of event) {
      this.goalsList.push(goal);
    }
    this.hide = false;
  }

  upsertGoals(): void {
    this.goalsService.upsertGoals(this.goalsList).subscribe(
      (res) => {
        this.successMessage = 'Save Successful';
        this.showSuccessMessage = true;
        setTimeout(this.refresh, 3000);
      },
      (error) => {
        this.errorMessage = 'Unable to save';
        this.showErrorMessage = true;
      }
    );
  }
}
