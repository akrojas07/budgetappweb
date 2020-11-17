import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../_services/goals.service';
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
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  showSuccessMessage: boolean;
  showErrorMessage: boolean;
  showNoGoalsMessage: boolean;
  successMessage: string;
  errorMessage: string;
  noGoalsMessage: string;

  goalsList: GoalsRequest[] = [];
  userId: number;

  public barChartLabels1: Label[] = ['Savings', 'Expenses'];
  public barChartType1: ChartType = 'bar';
  public barChartLegend1 = true;
  public barChartPlugins1 = [];
  public barChartData1: ChartDataSets[] = [
    {
      data: [3, 5],
      label: 'Target',
    },
    {
      data: [5, 8],
      label: 'Actual',
    },
  ];

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
  };

  public pieChartOptions1: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels1: Label[] = [
    ['Download', 'Sales'],
    ['In', 'Store', 'Sales'],
    'Mail Sales',
  ];
  public pieChartData1: SingleDataSet = [300, 500, 100];
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
  public pieChartLabels2: Label[] = [
    ['Download', 'Sales'],
    ['In', 'Store', 'Sales'],
    'Mail Sales',
  ];
  public pieChartData2: SingleDataSet = [300, 500, 100];
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];

  constructor(private goalsService: GoalsService) {}

  ngOnInit() {
    this.showErrorMessage = false;
    this.showSuccessMessage = false;

    this.userId = Number(localStorage.getItem('userId'));
    this.getGoalsList();

    // let data = [];
    // for(let i =0; i < result; i++){
    //   data.push(result[i])
    // }

    // let dataset1 =  { label :'sadsad', data : data};
    // this.barChartData.push(dataset1);
  }

  getGoalsList(): void {
    this.goalsList =[];
    this.goalsService.getGoals(this.userId).subscribe(
      (res) => {
        if (res !== null) {
          for (let i = 0; i < res.length; i++) {
            let goal = res[i];
            let progress = (goal.amount / goal.targetAmount) * 100;

            this.goalsList.push({
              Id: goal.id,
              UserId: this.userId,
              GoalAmount: goal.amount,
              GoalName: goal.goalName,
              GoalSummary: goal.goalSummary,
              StartDate: goal.startDate,
              EndDate: goal.endDate,
              TargetAmount: goal.targetAmount,
              Progress: progress > 100 ? 100 : progress
            });
          }
        }
      },
      (error) => {
        console.log(error);
        this.showNoGoalsMessage = true;
        this.noGoalsMessage = 'No Existing Goals';
      }
    );
  }

  refresh(): void {
    window.location.reload();
  }

  addGoal(event: GoalsRequest): void {
    console.log(this.goalsList);
    this.goalsList.push({
      UserId: event.UserId,
      GoalAmount: 0,
      GoalName: event.GoalName,
      GoalSummary: event.GoalSummary,
      StartDate : event.StartDate,
      EndDate : event.EndDate,
      TargetAmount: event.TargetAmount,
      Id: event.Id,
      Progress: 0
    });
    this.upsertGoals();


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
        console.log(error);
      }
    );
  }

  removeGoal(i: number): void {
    this.goalsList.splice(i, 1);
    console.log(this.goalsList);
    //this.upsertGoals();
  }
}
