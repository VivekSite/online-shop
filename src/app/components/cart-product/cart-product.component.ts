import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

import { ProductType } from '../../types';
import { CartService } from '../../services/cart.service';

interface CartProduct {
  product: ProductType;
  quantity: number;
  isSelected: boolean;
}

interface Quantity {
  quantity: number;
}

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [FormsModule, CheckboxModule, CommonModule, DropdownModule],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.scss',
})
export class CartProductComponent implements OnInit {
  @Input() productData!: CartProduct;
  priceAfterDiscount!: number;
  checked!: boolean;

  selectedQuantity: Quantity = { quantity: 1 };
  quantity: Quantity[] | undefined;

  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.checked = this.productData.isSelected;
    this.selectedQuantity = { quantity: this.productData.quantity}

    const price = this.productData.product.price;
    this.priceAfterDiscount = Math.round(
      price - price * (this.productData.product.discount / 100)
    );

    this.quantity = [
      { quantity: 1 },
      { quantity: 2 },
      { quantity: 3 },
      { quantity: 4 },
      { quantity: 5 },
      { quantity: 6 },
    ];
  }

  toggleCheckbox() {
    this.cartService
      .toggleProductSelection(this.checked, this.productData.product._id)
      .subscribe((res) => {
        this.cartService.setCartSubTotal = res.subTotal;
      });
  }

  changeQuantity() {
    this.cartService
      .updateProductQuantity(
        this.selectedQuantity.quantity,
        this.productData.product._id
      )
      .subscribe((res) => {
        this.cartService.setCartSubTotal = res.subTotal;
      });
  }
}
