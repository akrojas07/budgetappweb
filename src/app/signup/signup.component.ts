import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  model: any = {};
  showErrorMessage : boolean;
  errorMessage: string;
  signUpSubmitted: boolean; 

  @ViewChild('closebutton') closebutton;
  @ViewChild('signupForm') signUpForm;

  constructor(private userService : UserService,
    private router: Router) { }

  ngOnInit() {
    this.showErrorMessage = false;
    this.signUpSubmitted = false;
  }

  signUp()
  {
    this.showErrorMessage = false;
    this.signUpSubmitted = true;
    this.userService.signUp(this.model)
    .subscribe(res => {
      this.signUpForm.reset();
      this.closebutton.nativeElement.click();
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.userId.toString());
      this.signUpSubmitted = false;
    }, error => {
      this.signUpSubmitted = false;
      this.errorMessage = error;
      this.showErrorMessage = true;
    }, ()=>{
      this.router.navigate(['/home']);
    });
  }


}
