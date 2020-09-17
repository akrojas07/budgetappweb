import { Component, OnInit } from '@angular/core';

import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private userService : UserService) { }

  ngOnInit() {
  }

  loggedIn(){
    return this.userService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    console.log('logged out');
  }
}
