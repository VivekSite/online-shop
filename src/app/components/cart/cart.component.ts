import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart.service';
import { CartDataType } from '../../types';
import { CartProductComponent } from '../cart-product/cart-product.component';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  userCartData: CartDataType = {
    _id: '',
    user_id: '',
    products: [],
  };
  private userCartDataRef!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.userCartDataRef = this.cartService.getCartData().subscribe((res) => {
      this.userCartData = res.cartData;
      this.cartService.setCartSubTotal = res.subTotal;
    });
  }

  getCartValue() {
    return this.cartService.getCartSubTotal;
  }

  ngOnDestroy() {
    this.userCartDataRef.unsubscribe();
  }
}
