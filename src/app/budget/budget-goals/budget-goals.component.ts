import { Component, OnInit } from '@angular/core';
import { Goals } from '../../_models/goals';

@Component({
  selector: 'app-budget-goals',
  templateUrl: './budget-goals.component.html',
  styleUrls: ['./budget-goals.component.scss']
})
export class BudgetGoalsComponent implements OnInit {

  goal: Goals = new Goals(); 
  goals: Goals[];

  constructor() { }

  ngOnInit() {
  }

}
