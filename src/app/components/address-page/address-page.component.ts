import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from '../address/address.component';
import { AddressType, CreateAddressForm } from '../../types';
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-address-page',
  standalone: true,
  imports: [
    CommonModule,
    AddressComponent,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
  ],
  templateUrl: './address-page.component.html',
  styleUrl: './address-page.component.scss',
})
export class AddressPageComponent implements OnInit, OnDestroy {
  addresses: AddressType[] = [];
  selectedAddress!: AddressType;
  private addressesRef!: Subscription;
  deleteAddress!: (AddressId: string) => void;
  updateDefaultAddress!: (AddressId: string) => void;

  createAddressModal: boolean = false;
  createAddressForm!: FormGroup<CreateAddressForm>;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  loadAddresses() {
    this.addressesRef = this.accountService.GetAddresses().subscribe((res) => {
      this.addresses = res.addresses;
    });
  }

  createAddress() {
    this.accountService
      .CreateAddress({
        full_name: this.createAddressForm.value.full_name || '',
        mobile_number: this.createAddressForm.value.mobile_number || '',
        state: this.createAddressForm.value.state || '',
        city: this.createAddressForm.value.city || '',
        pin_code: this.createAddressForm.value.pin_code || '',
        landmark: this.createAddressForm.value.landmark || '',
        address: this.createAddressForm.value.address || '',
      })
      .subscribe((res) => {
        this.createAddressModal = false;
        this.createAddressForm.setValue({
          full_name: '',
          mobile_number: '',
          state: '',
          city: '',
          pin_code: '',
          landmark: '',
          address: '',
        });

        this.loadAddresses();
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

    this.createAddressForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(3)]],
      mobile_number: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pin_code: ['', [Validators.required]],
      landmark: [''],
      address: [''],
    });
  }

  isInValidField(field: string): boolean {
    const input = this.createAddressForm.get(field);
    return !!(input?.dirty && input?.invalid);
  }

  ngOnDestroy(): void {
    this.addressesRef.unsubscribe();
  }
}
