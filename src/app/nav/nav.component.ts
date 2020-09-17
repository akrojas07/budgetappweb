import { Component, OnInit } from '@angular/core';
import {AlertifyjsService} from '../_services/alertifyjs.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private alertify: AlertifyjsService) { }

  ngOnInit() {
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
