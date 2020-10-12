import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {UserUpdatePasswordResponse} from '../_models/UserUpdatePasswordResponse';
import {UserService} from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordReset',
  templateUrl: './passwordReset.component.html',
  styleUrls: ['./passwordReset.component.css']
})
export class PasswordResetComponent implements OnInit {

  email: string;
  showEmailErrorMessage: boolean;
  errorMessage: string;

  user: UserUpdatePasswordResponse = new UserUpdatePasswordResponse();


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

  }

  getUserByEmail(){
    this.userService.getUserByEmail(this.email).subscribe(
      (res) =>{
        console.log('I made it');
        this.user.UserId = res.Id;
        this.user.EmailAddress = res.Email;

      },
      (error) => {
        this.errorMessage = error;
        this.showEmailErrorMessage = true;
      }
    );

  }
}
