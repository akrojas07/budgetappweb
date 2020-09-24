import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLoginResponse } from '../_models/userLoginResponse';
import { UserLoginRequest } from '../_models/userLoginRequest';
import { UserUpdateProfile } from '../_models/userUpdateProfileResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(model: UserLoginRequest): Observable<UserLoginResponse>{
    return this.http.patch<UserLoginResponse>(this.baseUrl + 'login', model);
  }

  signUp(model: any): Observable<UserLoginResponse>{
    return this.http.post<UserLoginResponse>(this.baseUrl + 'signUp', model);
  }

  loggedIn(): boolean{
    const token = localStorage.getItem('token');
    if(token != null){
      return !this.jwtHelper.isTokenExpired(token);
    }


    const userId = localStorage.getItem('userId');
    if(userId == null)
    {
      return false;
    }

  }

  getUserByEmail(email:string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<any>(this.baseUrl + email, {headers});
  }

  getUserById(id:number): Observable<UserUpdateProfile>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<any>(this.baseUrl + id, {headers});
  }

  logOut(id: number): Observable<any>{
    const body: any = { UserId : id };
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.patch(this.baseUrl + 'logout', body,  {headers});
  }

  updateProfile(model: any): Observable<UserUpdateProfile>{
    return this.http.patch<UserUpdateProfile>(this.baseUrl + 'updateuser', model);
  }
}
