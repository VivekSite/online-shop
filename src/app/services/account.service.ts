import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { UserModelType } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor( private http: HttpClient) { }
  baseUrl = `${environment.BASE_URL}/user`

  GetUserData() {
    return this.http.get<{ success: boolean, userData: UserModelType }>(this.baseUrl);
  }

  UpdateName(name: string) {
    return this.http.patch(`${this.baseUrl}/name`, { name });
  }

  UpdateEmail(email: string) {
    return this.http.patch(`${this.baseUrl}/email`, { email });
  }

  UpdatePassword(oldPassword: string, newPassword: string) {
    return this.http.patch(`${this.baseUrl}/password`, { oldPassword, newPassword });
  }

  UpdateMobileNumber(newMobileNumber: string) {
    return this.http.patch(`${this.baseUrl}/mobile`, { newMobileNumber });
  }
}
