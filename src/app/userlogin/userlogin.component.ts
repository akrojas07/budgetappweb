import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  model: any = {};
  errorMessage: string;
  showErrorMessage: boolean;
  formSubmitted: boolean;

  constructor(private userService : UserService,
    private router: Router) { }


  ngOnInit() {
    this.showErrorMessage = false;
    this.formSubmitted = false;
  }

  signUp()
  {
    this.userService.signUp(this.model).subscribe(() => {
      console.log('sign up successful');
    }, error => {
      console.log(error);
    } );
  }
  
  login(){
    this.formSubmitted = true;
    this.showErrorMessage = false;
    this.userService.login(this.model).subscribe(next => {
      console.log('Login Successful');
      this.formSubmitted = false;

    }, error => {
      this.errorMessage = error;
      this.showErrorMessage = true;
      this.formSubmitted = false;
    }, () => {
      this.router.navigate(['/home']);
    });
  }

  logout(){
    localStorage.removeItem('token');
    console.log('logged out');
    this.router.navigate(['/home']);
  }


}
