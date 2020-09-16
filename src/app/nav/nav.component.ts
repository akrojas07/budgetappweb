import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  signInMode = false;
  constructor() { }

  ngOnInit() {
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
    console.log('logged out');

  }

  signInToggle()
  {
    this.signInMode = !this.signInMode;
  }
}
