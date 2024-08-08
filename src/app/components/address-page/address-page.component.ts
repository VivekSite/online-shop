import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { AccountService } from '../../services/account.service';

import { AddressComponent } from '../address/address.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import {
  AddressFormType,
  AddressType,
  UpdateAddressFormDataType,
} from '../../types';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-page',
  standalone: true,
  imports: [CommonModule, AddressComponent, AddressFormComponent],
  templateUrl: './address-page.component.html',
  styleUrl: './address-page.component.scss',
})
export class AddressPageComponent implements OnInit, OnDestroy {
  addresses: AddressType[] = [];
  selectedAddress!: AddressType;
  private addressesRef!: Subscription;
  deleteAddress!: (AddressId: string) => void;
  updateDefaultAddress!: (AddressId: string) => void;
  updateAddress!: (
    AddressId: string,
    UpdateAddressFormData: UpdateAddressFormDataType
  ) => void;
  createAddress!: (CreateAddressForm: FormGroup<AddressFormType>) => void;

  createAddressModal: boolean = false;
  closeCreateForm(data: boolean) {
    this.createAddressModal = data;
  }

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

    this.updateDefaultAddress = (AddressId: string) => {
      this.accountService.UpdateDefaultAddress(AddressId).subscribe((res) => {
        this.addresses = this.addresses.filter((address) => {
          if (address.is_default === true) {
            address.is_default = false;
          }
          if (address._id == AddressId) {
            address.is_default = true;
          }

          return address;
        });
      });
    };

    this.updateAddress = (
      AddressId: string,
      UpdateAddressFormData: UpdateAddressFormDataType
    ) => {
      this.accountService
        .UpdateAddress(AddressId, UpdateAddressFormData)
        .subscribe((res) => {
          this.addresses = this.addresses.map((address) => {
            if (address._id === AddressId) {
              address.full_name = UpdateAddressFormData.full_name || '';
              address.mobile_number = UpdateAddressFormData.mobile_number || '';
              address.state = UpdateAddressFormData.state || '';
              address.city = UpdateAddressFormData.city || '';
              address.pin_code = UpdateAddressFormData.pin_code || '';
              address.landmark = UpdateAddressFormData.landmark || '';
              address.address = UpdateAddressFormData.address || '';
            }
            return address;
          });
        });
    };

    this.createAddress = (CreateAddressForm: FormGroup<AddressFormType>) => {
      this.accountService
        .CreateAddress({
          full_name: CreateAddressForm.value.full_name || '',
          mobile_number: CreateAddressForm.value.mobile_number || '',
          state: CreateAddressForm.value.state || '',
          city: CreateAddressForm.value.city || '',
          pin_code: CreateAddressForm.value.pin_code || '',
          landmark: CreateAddressForm.value.landmark || '',
          address: CreateAddressForm.value.address || '',
        })
        .subscribe((res) => {
          this.createAddressModal = false;
          CreateAddressForm.reset();
          this.loadAddresses();
        });
    };
  }

  ngOnDestroy(): void {
    this.addressesRef.unsubscribe();
  }
}
