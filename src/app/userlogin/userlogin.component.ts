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

  login(){
    this.userService.login(this.model).subscribe(next => {
      console.log('Login Successful');
    }, error => {
      console.log('Failed to login');
    });
  }
}
