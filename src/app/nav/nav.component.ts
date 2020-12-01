import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router)
  { }

  @Output() errorOccurredEvent = new EventEmitter<string>();

  ngOnInit() {
  }

  loggedIn(){
    return this.userService.loggedIn();
  }

  logout(){
    let userId = Number(localStorage.getItem('userId'));
    this.userService.logOut(userId)
      .subscribe(res =>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.router.navigate(['/home']);
      },error =>{
        console.log(error);
        this.errorOccurredEvent.emit('Error occurred while logging out.');
      });
  }
}
