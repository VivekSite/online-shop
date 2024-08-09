import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import {
  AddressType,
  UserModelType,
  UpdateAddressFormDataType,
  AddressFormDataType,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  private baseUrl = `${environment.BASE_URL}/user`;
  private addressUrl = `${environment.BASE_URL}/address`;
  private authUrl = `${environment.BASE_URL}/auth`;

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

  CreateAddress(CreateAddressFormData: AddressFormDataType) {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.addressUrl}/create`,
      CreateAddressFormData
    );
  }

  UpdateDefaultAddress(AddressId: string) {
    return this.http.patch<{ success: boolean; message: string }>(
      `${this.addressUrl}/make_default/${AddressId}`,
      {}
    );
  }

  UpdateAddress(
    AddressId: string,
    UpdateAddressFormData: UpdateAddressFormDataType
  ) {
    return this.http.put<{ success: boolean; message: string }>(
      `${this.addressUrl}/${AddressId}`,
      { UpdateAddressFormData }
    );
  }

  SendVerificationCode(
    type: 'Email' | 'Mobile',
    mobile_number: string | null = null
  ) {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.authUrl}/otp`,
      { type, mobile_number }
    );
  }

  VerifyOTP(type: 'Email' | 'Mobile', otp: number) {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.authUrl}/verify/otp`,
      { type, otp }
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
