import { Component } from '@angular/core';
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
export class CartComponent {
  userCartData: CartDataType = {
    _id: '',
    user_id: '',
    products: [],
  };
  subtotal: number = 0;
  private userCartDataRef!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.userCartDataRef = this.cartService.getCartData().subscribe((res) => {
      this.userCartData = res.cartData;
    });
  }

  ngOnDestroy() {
    this.userCartDataRef.unsubscribe();
  }
}
