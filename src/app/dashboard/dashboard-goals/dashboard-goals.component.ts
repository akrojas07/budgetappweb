import { isNgTemplate } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GoalsResponse } from 'src/app/_models/GoalsResponse';
import { GoalsRequest } from '../../_models/GoalsRequest';

@Component({
  selector: 'app-dashboard-goals',
  templateUrl: './dashboard-goals.component.html',
  styleUrls: ['./dashboard-goals.component.scss'],
})
export class DashboardGoalsComponent implements OnInit {
  showAddErrorMessage: boolean;
  showAddSuccessMessage: boolean;
  showUpdateErrorMessage: boolean;
  showUpdateSuccessMessage: boolean;
  hide: boolean;

  addErrorMessage: string;
  addSuccessMessage: string;
  updateErrorMessage: string;
  updateSuccessMessage: string;

  indexNumber: number;
  userId: number;

  model: GoalsRequest;
  updateModel: GoalsRequest;
  currentGoalList: GoalsRequest[];



  @ViewChild('closebutton') closebutton;
  @ViewChild('goalForm') goalForm;
  @ViewChild('updateForm') updateForm;

  constructor() {}

  @Input('goalsList') goalsList: GoalsRequest[];
  @Output() goalEvent = new EventEmitter<GoalsRequest[]>();

  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId'));
    this.showAddSuccessMessage = false;
    this.showAddErrorMessage = false;
    this.showUpdateErrorMessage = false;
    this.showUpdateSuccessMessage = false;
    this.hide = false;
    this.model = new GoalsRequest();
    this.updateModel = new GoalsRequest();
    this.currentGoalList = this.goalsList;
  }

  goalEventEmit(): void {
    this.goalEvent.emit(this.currentGoalList);
  }

  pullGoal(i: number): void {
    this.indexNumber = i;
    //using 0 instead of i because updateGoal only has one item in the array
    const updateGoal = this.currentGoalList.slice(i, i + 1);
    this.updateModel.UserId = this.userId;
    this.updateModel.Id = updateGoal[0].Id;
    this.updateModel.GoalName = updateGoal[0].GoalName;
    this.updateModel.GoalSummary = updateGoal[0].GoalSummary;
    this.updateModel.TargetAmount = updateGoal[0].TargetAmount;
    this.updateModel.GoalAmount = updateGoal[0].GoalAmount;
    this.updateModel.StartDate = updateGoal[0].StartDate;
    this.updateModel.EndDate = updateGoal[0].EndDate;
  }

  addGoalToGoalList(): void {
    const goal = new GoalsRequest();
    goal.Id = 0;
    goal.UserId = this.userId;
    goal.GoalName = this.model.GoalName;
    goal.GoalSummary = this.model.GoalSummary;
    goal.GoalAmount = 0;
    goal.TargetAmount = this.model.TargetAmount;
    goal.StartDate = this.model.StartDate;
    goal.EndDate = this.model.EndDate;
    goal.Progress = 0;
    this.currentGoalList.push(goal);
    this.goalEventEmit();
    this.hide = true;
    this.addSuccessMessage = 'Goal Added';
    this.showAddSuccessMessage = true;

  }

  updateGoalsList(): void {
    this.currentGoalList[this.indexNumber].Id = this.updateModel.Id;
    this.currentGoalList[this.indexNumber].UserId = this.updateModel.UserId;
    this.currentGoalList[this.indexNumber].GoalName = this.updateModel.GoalName;
    this.currentGoalList[
      this.indexNumber
    ].GoalAmount = this.updateModel.GoalAmount;
    this.currentGoalList[
      this.indexNumber
    ].GoalSummary = this.updateModel.GoalSummary;
    this.currentGoalList[
      this.indexNumber
    ].TargetAmount = this.updateModel.TargetAmount;
    this.currentGoalList[
      this.indexNumber
    ].StartDate = this.updateModel.StartDate;
    this.currentGoalList[this.indexNumber].EndDate = this.updateModel.EndDate;

    this.goalEventEmit();
    this.closebutton.nativeElement.click();

  }

  removeGoal(i: number): void {
    this.currentGoalList.splice(i, 1);
    this.goalEventEmit();
  }
}
