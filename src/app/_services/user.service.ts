import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLoginResponse } from '../_models/userLoginResponse';
import { UserLoginRequest } from '../_models/userLoginRequest';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  
  private headers: HttpHeaders;
  private userId: number;

  constructor(private http: HttpClient) {}

  login(model: UserLoginRequest): Observable<UserLoginResponse>{
    return this.http.patch<UserLoginResponse>(this.baseUrl + 'login', model);
  }

  signUp(model: any): Observable<UserLoginResponse>{
    return this.http.post<UserLoginResponse>(this.baseUrl + 'signUp', model);
  }

  loggedIn(): boolean{
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserByEmail(email): Observable<any>{
    return this.http.get<any>(this.baseUrl + email, {headers: this.headers});
  }

  logOut(id: number): Observable<any>{
    const body: any = { UserId : id };
    return this.http.patch(this.baseUrl + 'logout', body,  {headers: this.headers});
  }

  setUserId(id: number): void{
    this.userId = id;
  }

  setAuthHeader(): void{
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }

  getUserId(): number{
    return this.userId;
  }
}
