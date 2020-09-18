import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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
}
