import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  model: any = {};
  constructor(private userService : UserService) { }


  ngOnInit() {
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
    this.userService.login(this.model).subscribe(next => {
      console.log('Login Successful');
    }, error => {
      console.log(error);
    });
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
    console.log('logged out');
  }


}
