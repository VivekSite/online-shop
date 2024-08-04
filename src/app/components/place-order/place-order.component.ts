import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { RadioButtonModule } from 'primeng/radiobutton';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { AddressType, ProductType } from '../../types';

import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { AccountService } from '../../services/account.service';

interface CreateAddressForm {
  full_name: FormControl<string | null>;
  mobile_number: FormControl<string | null>;
  state: FormControl<string | null>;
  city: FormControl<string | null>;
  pin_code: FormControl<string | null>;
  landmark: FormControl<string | null>;
  address: FormControl<string | null>;
}

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    FormsModule,
    RadioButtonModule,
    CommonModule,
    DialogModule,
    FloatLabelModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss',
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  private productRef!: Subscription;
  product!: ProductType;

  private addressesRef!: Subscription;
  selectedAddress!: AddressType;
  addresses!: AddressType[];

  createAddressModal: boolean = false;
  createAddressForm!: FormGroup<CreateAddressForm>;

  constructor(
    private productService: ProductService,
    private order: OrderService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => [
      (this.productRef = this.productService
        .getProductById(params['productId'])
        .subscribe((res) => {
          this.product = res.products[0];
        })),
    ]);

    this.addressesRef = this.accountService.GetAddresses().subscribe((res) => {
      this.addresses = res.addresses;
    });

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

  createAddress() {
    console.log(this.createAddressForm.value);
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
        console.log(res);
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
      });
  }

  ngOnDestroy(): void {
    this.productRef.unsubscribe();
    this.addressesRef.unsubscribe();
  }
}
