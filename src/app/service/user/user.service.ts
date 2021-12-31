import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginCredentials } from '../../models/login-credentials.model';
import { environment } from 'src/environments/environment';
import { LoginResponse } from 'src/app/models/login-response.model';
import { Observable } from 'rxjs';
import { RegisterCredentials } from 'src/app/models/register-credentials.model';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { RegisterResponse } from 'src/app/models/register-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  login = (credentials: LoginCredentials): Observable<LoginResponse> => {
    return this.http.post<LoginResponse>(`${environment.baseUrl}/api/v1/users/login`, credentials);
  }

  register = (credentials: RegisterCredentials) => {
    return this.http.post<RegisterResponse>(`${environment.baseUrl}/api/v1/users/register`, credentials);
  }

  logout = () => {
    this.cookies.delete("user_token");
  }

  setToken = (token: string) => {
    this.cookies.set("user_token", token);
  }

  getToken = (): string | null => {
    return this.cookies.get("user_token");
  }

  getUserInfo = (): Observable<User> => {
    return this.http.get<User>(`${environment.baseUrl}/api/v1/users/info`);
  }
}
