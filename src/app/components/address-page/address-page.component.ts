import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from '../address/address.component';
import { AddressType } from '../../types';
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-page',
  standalone: true,
  imports: [CommonModule, AddressComponent],
  templateUrl: './address-page.component.html',
  styleUrl: './address-page.component.scss',
})
export class AddressPageComponent implements OnInit, OnDestroy {
  addresses: AddressType[] = [];
  addressesRef!: Subscription;
  deleteAddress!: (AddressId: string) => void;

  constructor(private accountService: AccountService) {}

  loadAddresses() {
    this.addressesRef = this.accountService.GetAddresses().subscribe((res) => {
      this.addresses = res.addresses;
    });
  }

  ngOnInit(): void {
    this.loadAddresses();

    this.deleteAddress = (AddressId: string) => {
      this.accountService.DeleteAddress(AddressId).subscribe((res) => {
        this.addresses = this.addresses.filter(
          (address) => address._id !== AddressId
        );
      });
    };
  }

  ngOnDestroy(): void {
    this.addressesRef.unsubscribe();
  }
}
