import { Component, OnInit } from '@angular/core';
import {AlertifyjsService} from '../_services/alertifyjs.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private alertify: AlertifyjsService, private userService : UserService) { }

  ngOnInit() {
  }

  loggedIn(){
    return this.userService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertify.message('logged out');

  }

}
