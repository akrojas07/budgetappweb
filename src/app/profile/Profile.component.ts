import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginRequest } from '../_models/userLoginRequest';
import { UserProfileUpdateRequest } from '../_models/UserProfileUpdateRequest';
import { UserUpdateProfile } from '../_models/userUpdateProfileResponse';
import { UserService } from '../_services/user.service';
import { UserUpdatePasswordResponse } from '../_models/UserUpdatePasswordResponse';
import { UserUpdatePasswordRequest } from '../_models/UserUpdatePasswordRequest';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: UserUpdateProfile = new UserUpdateProfile();
  updateUser: UserProfileUpdateRequest = new UserProfileUpdateRequest();
  
  currentPassword: UserUpdatePasswordResponse = new UserUpdatePasswordResponse();
  updatedPassword: UserUpdatePasswordRequest = new UserUpdatePasswordRequest();

  errorMessage: string;
  successMessage: string;

  showErrorMessage: boolean;
  showSuccessMessage: boolean;
  formSubmitted: boolean;

  constructor(private userService : UserService,
    private router: Router) { }

  ngOnInit() {  
    this.getUserById();
    this.showErrorMessage = false;
    this.showSuccessMessage = false;
    this.formSubmitted = false;
  }

  getUserById(){
    const id = Number(localStorage.getItem('userId'));
    this.userService.getUserById(id)
      .subscribe(res => {
        // set model equal to HTTP response
        this.currentUser = res; 
        this.updateUser.FirstName = res.firstName;
        this.updateUser.LastName = res.lastName;
        this.updateUser.Email = res.email;
      }, error => {
        this.errorMessage = error;
        this.showErrorMessage = true;
      });
  }

  submitProfileChanges(){
    this.updateUser.UserId = Number(localStorage.getItem('userId'));
    this.formSubmitted = true;
    this.showErrorMessage = false;
    this.userService.updateProfile(this.updateUser)
      .subscribe(res => {

        console.log("Update hit");
        this.successMessage = 'Update Successful';
        this.showSuccessMessage = true;
        this.formSubmitted = false;
        this.currentUser.firstName = this.updateUser.FirstName;
        this.currentUser.lastName = this.updateUser.LastName;
        this.currentUser.email = this.updateUser.Email;


      }, error => {
        this.errorMessage = error;
        this.showErrorMessage = true;
        this.formSubmitted = false;
      });
  }

  submitPasswordChanges(){
    this.updatedPassword.UserId = Number(localStorage.getItem('userId'));
    this.formSubmitted = true;
    this.showErrorMessage = false;
    this.userService.updatePassword(this.updatedPassword)
      .subscribe(res => {
        console.log("Password hit");
        this.successMessage = 'Password Update Successful';
        this.showSuccessMessage = true;
        this.formSubmitted = false;
      }, error => {
        this.errorMessage = error;
        this.showErrorMessage = true;
        this.formSubmitted = false;
      });
  }
}
