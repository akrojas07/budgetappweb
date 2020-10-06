import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  model: any = {};
  showErrorMessage : boolean;
  errorMessage: string;

  @ViewChild('closebutton') closebutton;
  @ViewChild('signupForm') signUpForm;

  constructor(private userService : UserService,
    private router: Router) { }

  ngOnInit() {
    this.showErrorMessage = false;
  }

  signUp()
  {
    this.showErrorMessage = false;
    this.userService.signUp(this.model)
    .subscribe(res => {
      console.log(res);
      console.log(res.userId);
      console.log('sign up successful');

      this.signUpForm.reset();
      this.closebutton.nativeElement.click();
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.userId.toString());
    }, error => {
      this.errorMessage = error;
      this.showErrorMessage = true;

    }, ()=>{
      this.router.navigate(['/home']);
    });
  }


}
