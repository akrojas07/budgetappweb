import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUpdateProfile } from '../_models/userUpdateProfileResponse';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.scss']
})
export class ProfileComponent implements OnInit {

  model: UserUpdateProfile = new UserUpdateProfile();
  errorMessage: string;
  showErrorMessage: boolean;
  formSubmitted: boolean;
  constructor(private userService : UserService,
    private router: Router) { }

  ngOnInit() {  
    console.log("here");
    this.getUserById();
    this.showErrorMessage = false;
    this.formSubmitted = false;
  }

  getUserById(){
    const id = Number(localStorage.getItem('userId'));
    this.userService.getUserById(id)
      .subscribe(res => {
        this.model = res; 

      }, error => {
        this.errorMessage = error;
        this.showErrorMessage = true;
      });
  }

  submitProfileChanges(){
    this.formSubmitted = true;
    this.showErrorMessage = false;
    this.userService.updateProfile(this.model)
      .subscribe(res => {

        console.log("I have been hit");

        this.formSubmitted = false;


      }, error => {
        this.errorMessage = error;
        this.showErrorMessage = true;
        this.formSubmitted = false;
      }, () => {
        this.router.navigate(['/dashboard']);
      });
  }
}
