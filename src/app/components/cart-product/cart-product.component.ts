import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

import { ProductType } from '../../types';
import { CartService } from '../../services/cart.service';

interface CartProduct {
  _id: ProductType;
  quantity: number;
  isSelected: boolean;
}

interface City {
  quantity: number;
}

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [FormsModule, CheckboxModule, CommonModule, DropdownModule],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.scss',
})
export class CartProductComponent {
  @Input() product!: CartProduct;
  priceAfterDiscount!: number;
  checked!: boolean;

  selectedQuantity: City = { quantity: 1 };
  quantity: City[] | undefined;

  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.checked = this.product.isSelected;
    this.selectedQuantity = { quantity: this.product.quantity}

    const price = this.product._id.price;
    this.priceAfterDiscount = Math.round(
      price - price * (this.product._id.discount / 100)
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
      .toggleProductSelection(this.checked, this.product._id._id)
      .subscribe((res) => {
        this.cartService.setCartSubTotal = res.subTotal;
      });
  }

  changeQuantity() {
    this.cartService
      .updateProductQuantity(
        this.selectedQuantity.quantity,
        this.product._id._id
      )
      .subscribe((res) => {
        this.cartService.setCartSubTotal = res.subTotal;
      });
  }
}
