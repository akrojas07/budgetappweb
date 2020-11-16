import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../_services/goals.service';
import { ChartOptions, ChartType, ChartDataSets, TickOptions, ChartData } from 'chart.js';
import { Colors, Label } from 'ng2-charts';
import { GoalsResponse } from '../_models/GoalsResponse';
import { Goals } from '../_models/GoalsRequest';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

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
  public barChartOptions1: ChartOptions = { responsive: true, scales: { yAxes:[{ticks: {min: 0}}]}};

  goalsList: Goals[] = [];
  userId: number;

  constructor(private goalsService: GoalsService) {}

  ngOnInit() {
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
    this.goalsService
      .getGoals(this.userId)
      .subscribe((res) =>{
        for (let i = 0; i < res.length; i++){
          let goal = res[i];
          let progress = ((goal.amount / goal.targetAmount) * 100);

          this.goalsList.push({
            GoalAmount: goal.amount,
            GoalName: goal.goalName,
            GoalSummary: goal.goalSummary,
            StartDate: goal.startDate,
            EndDate: goal.endDate,
            TargetAmount: goal.targetAmount,
            Progress: (progress > 100) ? 100 : progress
          });
        }
      });
  }

  // populateGoalDataset(): void {
  //   this.goalsList.forEach(
  //     goal =>
  //     console.log(goal)
  //   );
  // }
}
