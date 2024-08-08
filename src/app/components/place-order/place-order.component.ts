import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AddressType, ProductType, AddressFormType } from '../../types';

import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { AccountService } from '../../services/account.service';
import { AddressFormComponent } from '../address-form/address-form.component';

interface Quantity {
  quantity: number;
}

interface PaymentType {
  name: string;
  value: string;
}

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    RadioButtonModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    AddressFormComponent,
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss',
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  routeRef!: Subscription;

  private productRef!: Subscription;
  product!: ProductType;

  private addressesRef!: Subscription;
  selectedAddress!: AddressType;
  addresses!: AddressType[];

  createAddressModal: boolean = false;
  createAddress!: (CreateAddressForm: FormGroup<AddressFormType>) => void;
  closeCreateForm(data: boolean) {
    this.createAddressModal = data;
  }

  selectedQuantity: Quantity = { quantity: 1 };
  quantity: Quantity[] = [
    { quantity: 1 },
    { quantity: 2 },
    { quantity: 3 },
    { quantity: 4 },
    { quantity: 5 },
    { quantity: 6 },
  ];

  selectedPaymentType: PaymentType = {
    name: 'Pay on Delivery',
    value: 'Cash on Delivery/Pay on Delivery',
  };
  paymentTypes: PaymentType[] = [
    { name: 'Credit Card', value: 'Credit or debit card' },
    { name: 'UPI', value: 'Other UPI Apps' },
    { name: 'Pay on Delivery', value: 'Cash on Delivery/Pay on Delivery' },
  ];

  constructor(
    private productService: ProductService,
    private order: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.routeRef = this.route.params.subscribe((params) => {
      this.productRef = this.productService
        .getProductById(params['productId'])
        .subscribe((res) => {
          this.product = res.products[0];
        });
    });

    this.addressesRef = this.accountService.GetAddresses().subscribe((res) => {
      this.addresses = res.addresses;
    });

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

          this.addressesRef.unsubscribe();
          this.addressesRef = this.accountService
            .GetAddresses()
            .subscribe((res) => {
              this.addresses = res.addresses;
            });
        });
    };
  }

  placeOrder() {
    this.order
      .PlaceOrder(
        this.product._id,
        this.selectedAddress._id,
        this.selectedQuantity.quantity,
        this.selectedPaymentType.name
      )
      .subscribe((res) => {
        this.router.navigate(['/orders']);
      });
  }

  ngOnDestroy(): void {
    this.productRef.unsubscribe();
    this.addressesRef.unsubscribe();
    this.routeRef.unsubscribe();
  }
}
