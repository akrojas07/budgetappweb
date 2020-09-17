import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {AlertifyjsService} from '../_services/alertifyjs.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  model: any = {};
  constructor(private userService : UserService, private alertify: AlertifyjsService) { }


  ngOnInit() {
  }

  signUp()
  {
    this.userService.signUp(this.model).subscribe(() => {
      this.alertify.success('sign up successful');
    }, error => {
      this.alertify.error(error);
    } );
  }
  
  login(){
    this.userService.login(this.model).subscribe(next => {
      this.alertify.success('Login Successful');
    }, error => {
      this.alertify.error(error);
    });
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }


}
