import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { UserloginComponent } from './userlogin/userlogin.component';

import {UserService} from './_services/user.service';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import {ErrorInterceptorProvider} from './_services/error.interceptor';
import { ProfileComponent } from './profile/Profile.component';
import { DashboardComponent } from './dashboard/Dashboard.component';
import { BudgetComponent } from './budget/Budget.component';
import {appRoutes} from './routes';


@NgModule({
  declarations: [							
    AppComponent,
      UserComponent,
      NavComponent,
      UserloginComponent,
      HomeComponent,
      SignupComponent,
      ProfileComponent,
      DashboardComponent,
      BudgetComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
