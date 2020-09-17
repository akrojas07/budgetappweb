import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {AlertifyjsService} from '../_services/alertifyjs.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  model: any = {};
  constructor(private userService : UserService, private alertify : AlertifyjsService) { }


  ngOnInit() {
  }

  signUp()
  {
    this.userService.signUp(this.model).subscribe(() => {
      this.alertify.success('sign up successful');
    }, error => {
      this.alertify.error(error);
    } );
  }

  cancel(){
    this.alertify.message('cancelled');
  }
}
