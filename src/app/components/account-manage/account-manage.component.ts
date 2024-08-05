import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountService } from '../../services/account.service';
import { UserModelType } from '../../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-manage.component.html',
  styleUrl: './account-manage.component.scss'
})
export class AccountManageComponent implements OnInit, OnDestroy {
  userData!: UserModelType;
  userDateRef!: Subscription;

  constructor(private account: AccountService) {}

  ngOnInit(): void {
    this.userDateRef = this.account.GetUserData().subscribe((data) => {
      this.userData = data.userData;
    })
  }

  ngOnDestroy(): void {
    this.userDateRef.unsubscribe();
  }
}
