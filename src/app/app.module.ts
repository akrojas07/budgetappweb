import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { UserloginComponent } from './userlogin/userlogin.component';

import {UserService} from './_services/user.service';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import {ErrorInterceptorProvider} from './_services/error.interceptor';

@NgModule({
  declarations: [				
    AppComponent,
      UserComponent,
      NavComponent,
      UserloginComponent,
      HomeComponent,
      SignupComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule
  ],
  providers: [
    UserService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
