import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDataType } from '../../types';
import { Subscription } from 'rxjs';

import { SkeletonModule } from 'primeng/skeleton';

import { CartProductComponent } from '../cart-product/cart-product.component';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartProductComponent, SkeletonModule],
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
  isLoading: boolean = true;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userCartDataRef = this.cartService.getCartData().subscribe((res) => {
      this.userCartData = res.cartData;
      this.cartService.setCartSubTotal = res.subTotal;
    this.isLoading = false;
    });
  }

  getCartValue() {
    return this.cartService.getCartSubTotal;
  }

  ngOnDestroy() {
    this.userCartDataRef.unsubscribe();
  }
}
