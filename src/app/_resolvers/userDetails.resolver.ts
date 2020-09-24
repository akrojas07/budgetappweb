import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserUpdateProfile } from '../_models/userUpdateProfileResponse';
import { UserService } from '../_services/user.service';
@Injectable()
export class UserDetailResolver implements Resolve<UserUpdateProfile> {
  showErrorMessage: boolean;
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserUpdateProfile> {
    return this.userService.getUserById(route.params['id']).pipe(
      catchError(error => {
        this.showErrorMessage = true;
        this.errorMessage = error;
        return of(null);
      })
    );
  }
}
