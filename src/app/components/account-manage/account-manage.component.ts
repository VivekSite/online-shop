import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserModelType } from '../../types';
import { Subscription } from 'rxjs';

import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';

import { AccountService } from '../../services/account.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-account-manage',
  standalone: true,
  imports: [CommonModule, InputNumberModule, DialogModule, ReactiveFormsModule],
  templateUrl: './account-manage.component.html',
  styleUrl: './account-manage.component.scss',
})
export class AccountManageComponent implements OnInit, OnDestroy {
  userData!: UserModelType;
  userDateRef!: Subscription;
  sendVerificationCode!: (type: 'Mobile' | 'Email') => void;
  verifyOTP!: (type: 'Mobile' | 'Email') => void;
  otpForm!: FormGroup<{
    otp: FormControl<string | null>;
  }>;

  otpModal: boolean = false;
  constructor(
    private account: AccountService,
    private fb: FormBuilder,
    private toast: NotificationService
  ) {}

  ngOnInit(): void {
    this.userDateRef = this.account.GetUserData().subscribe((data) => {
      this.userData = data.userData;
    });

    this.sendVerificationCode = (type: 'Mobile' | 'Email') => {
      this.account.SendVerificationCode(type).subscribe((res) => {
        this.toast.success('Success', res.message);
      });
      this.otpModal = true;
    };

    this.verifyOTP = (type: 'Mobile' | 'Email') => {
      const enteredOtp = this.otpForm.value.otp;
      console.log(enteredOtp);
      if (enteredOtp?.length !== 6) {
        this.toast.error('Error', 'Invalid OTP Please enter a valid OTP');
        return;
      }

      const parsedOtp = parseInt(enteredOtp);
      this.account.VerifyOTP(type, parsedOtp).subscribe((res) => {
        this.toast.success('Success', res.message);

        if (type === 'Email') {
          this.userData.isEmailVerified = true;
        } else if (type === 'Mobile') {
          this.userData.isMobileVerified = true;
        }
        this.otpForm.setValue({
          otp: '',
        });
        this.otpModal = false;
      });
    };

    this.otpForm = this.fb.group({
      otp: [''],
    });
  }

  ngOnDestroy(): void {
    this.userDateRef.unsubscribe();
  }
}
