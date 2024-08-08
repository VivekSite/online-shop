import { Component, Input, OnInit } from '@angular/core';
import {
  AddressType,
  UpdateAddressFormDataType,
  AddressFormType,
  AddressFormDataType,
} from '../../types';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, AddressFormComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  @Input() address!: AddressType;
  @Input() deleteAddress!: (AddressId: string) => void;
  @Input() updateDefaultAddress!: (AddressId: string) => void;
  @Input() updateAddressForm!: FormGroup<AddressFormType>;
  @Input() updateAddress!: (
    AddressId: string,
    UpdateAddressFormData: UpdateAddressFormDataType
  ) => void;

  updateAddressModal: boolean = false;
  openEditForm!: () => void;

  closeEditForm(data: boolean) {
    this.updateAddressModal = data;
  }

  handleEvent(UpdateAddressForm: FormGroup<AddressFormType>) {
    this.updateAddress(this.address._id, {
      full_name: UpdateAddressForm.value.full_name || '',
      mobile_number: UpdateAddressForm.value.mobile_number || '',
      state: UpdateAddressForm.value.state || '',
      city: UpdateAddressForm.value.city || '',
      pin_code: UpdateAddressForm.value.pin_code || '',
      landmark: UpdateAddressForm.value.landmark || '',
      address: UpdateAddressForm.value.address || '',
    });
    this.updateAddressModal = false;
  }

  ngOnInit(): void {
    this.openEditForm = () => {
      this.updateAddressForm.setValue({
        full_name: this.address.full_name,
        mobile_number: this.address.mobile_number,
        state: this.address.state,
        city: this.address.city,
        pin_code: this.address.pin_code,
        landmark: this.address.landmark,
        address: this.address.address,
      });
      this.updateAddressModal = true;
    };
  }

  isInValidField(field: string): boolean {
    const input = this.updateAddressForm.get(field);
    return !!(input?.dirty && input?.invalid);
  }
}
