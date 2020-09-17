import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private http:HttpClient, private userService : UserService) { }

  ngOnInit() {
  }

  loggedIn(){
    this.userService.loggedIn();
  }


}
