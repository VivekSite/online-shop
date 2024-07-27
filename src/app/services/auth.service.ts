import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _registerUrl = 'http://localhost:8080/api/v1/auth/sign_up';
  private _loginUrl = 'http://localhost:8080/api/v1/auth/sign_in';

  constructor(private http: HttpClient) {}

  registerUser(user: UserType) {
    return this.http.post<{ message: string, token: string }>(this._registerUrl, user);
  }

  loginUser(user: { email: string, password: string }) {
    return this.http.post<{ message: string, token: string }>(
      this._loginUrl,
      user
    );
  }

  logoutUser() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  IsLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
