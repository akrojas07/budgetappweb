import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GoalsResponse } from 'src/app/_models/GoalsResponse';
import { GoalsRequest } from '../../_models/GoalsRequest';

@Component({
  selector: 'app-dashboard-goals',
  templateUrl: './dashboard-goals.component.html',
  styleUrls: ['./dashboard-goals.component.scss']
})
export class DashboardGoalsComponent implements OnInit {
  showErrorMessage: boolean;
  showSuccessMessage: boolean;

  errorMessage: string;
  successMessage: string;
  userId: number;

  model: GoalsRequest;
  updateModel: GoalsRequest;

  @ViewChild('closebutton') closebutton;
  @ViewChild('goalForm') goalForm;
  @ViewChild('updateForm') updateForm;



  constructor() { }

  @Output() goalEvent = new EventEmitter<GoalsRequest>();

  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId'));
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.model = new GoalsRequest();
    this.updateModel = new GoalsRequest(); 
  }

  addGoalEventEmit() {
    const goal = new GoalsRequest();
    goal.UserId = this.userId;
    goal.GoalName = this.model.GoalName;
    goal.GoalSummary = this.model.GoalSummary;
    goal.GoalAmount = 0;
    goal.TargetAmount = this.model.TargetAmount;
    goal.StartDate = this.model.StartDate;
    goal.EndDate = this.model.EndDate;
    this.goalEvent.emit(goal);
  }

  updateGoal(): void {

  }
}
