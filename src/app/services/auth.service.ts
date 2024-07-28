import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { UserType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _registerUrl = `${environment.BASE_URL}/auth/sign_up`;
  private _loginUrl = `${environment.BASE_URL}/auth/sign_in`;

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
