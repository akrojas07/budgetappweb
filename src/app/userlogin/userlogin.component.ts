import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserLoginRequest } from '../_models/userLoginRequest';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  model: UserLoginRequest;
  errorMessage: string;
  showErrorMessage: boolean;
  formSubmitted: boolean;

  constructor(private userService : UserService,
    private router: Router) { }


  ngOnInit() {
    this.showErrorMessage = false;
    this.formSubmitted = false;

    this.model = new UserLoginRequest();
  }

  login(){
    this.formSubmitted = true;
    this.showErrorMessage = false;
    this.userService.login(this.model)
      .subscribe(res => {
        console.log('Login Successful');
        localStorage.setItem('token', res.token);
        this.formSubmitted = false;
        this.userService.setUserId(res.userId);
        this.userService.setAuthHeader();
      }, error => {
        this.errorMessage = error;
        this.showErrorMessage = true;
        this.formSubmitted = false;
      }, () => {
        this.router.navigate(['/home']);
      });
  }
}
