import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { AddressType, UserModelType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  private baseUrl = `${environment.BASE_URL}/user`;
  private addressUrl = `${environment.BASE_URL}/address`;

  GetUserData() {
    return this.http.get<{ success: boolean; userData: UserModelType }>(
      this.baseUrl
    );
  }

  GetAddresses() {
    return this.http.get<{ success: boolean; addresses: AddressType[] }>(
      this.addressUrl
    );
  }

  DeleteAddress(AddressId: string) {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.addressUrl}/${AddressId}`
    );
  }

  CreateAddress(CreateAddressFormData: {
    full_name: string;
    mobile_number: string;
    state: string;
    city: string;
    pin_code: string;
    landmark: string;
    address: string;
  }) {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.addressUrl}/create`,
      CreateAddressFormData
    );
  }

  UpdateName(name: string) {
    return this.http.patch(`${this.baseUrl}/name`, { name });
  }

  UpdateEmail(email: string) {
    return this.http.patch(`${this.baseUrl}/email`, { email });
  }

  UpdatePassword(oldPassword: string, newPassword: string) {
    return this.http.patch(`${this.baseUrl}/password`, {
      oldPassword,
      newPassword,
    });
  }

  UpdateMobileNumber(newMobileNumber: string) {
    return this.http.patch(`${this.baseUrl}/mobile`, { newMobileNumber });
  }
}
