import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {ProgressBarModule} from "angular-progress-bar";

import { UserDetailResolver } from '../app/_resolvers/userDetails.resolver';
import { appRoutes } from './routes';
import { ChartsModule } from 'ng2-charts';

import { UserService } from './_services/user.service';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ProfileComponent } from './profile/Profile.component';
import { DashboardComponent } from './dashboard/Dashboard.component';
import { BudgetComponent } from './budget/Budget.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { PasswordResetComponent } from './passwordReset/passwordReset.component';
import { BudgetIncomeComponent } from './budget/budgetIncome/budgetIncome.component';
import { BudgetExpensesComponent } from './budget/budgetExpenses/budgetExpenses.component';
import { BudgetSavingsComponent } from './budget/budget-Savings/budget-Savings.component';
import { DashboardGoalsComponent} from './dashboard/dashboard-goals/dashboard-goals.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UserloginComponent,
    HomeComponent,
    SignupComponent,
    ProfileComponent,
    DashboardComponent,
    BudgetComponent,
    PasswordResetComponent,
    BudgetIncomeComponent,
    BudgetExpensesComponent,
    BudgetSavingsComponent,
    DashboardGoalsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    ProgressBarModule
  ],
  providers: [UserService, ErrorInterceptorProvider, UserDetailResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
