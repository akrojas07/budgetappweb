import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/Profile.component';
import { BudgetComponent } from './budget/Budget.component';
import { DashboardComponent } from './dashboard/Dashboard.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'budget', component: BudgetComponent },
    ],
  },

  { path: 'signIn', component: UserloginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
