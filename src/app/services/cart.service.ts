import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { CartDataType, CartWithSubTotal } from '../types';
import { BehaviorSubject, map } from 'rxjs';

interface PutResponseType {
  success: boolean;
  subTotal: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private CartSubTotal: number = 0;

  private _cartUrl: string = `${environment.BASE_URL}/user/cart`;
  constructor(private http: HttpClient) {}

  set setCartSubTotal(value: number) {
    this.CartSubTotal = value;
  }

  get getCartSubTotal() {
    return this.CartSubTotal;
  }

  getCartData() {
    return this.http.get<{ cartData: CartDataType; subTotal: number }>(
      this._cartUrl
    );
  }

  toggleProductSelection(isSelected: boolean, productId: string) {
    return this.http.put<PutResponseType>(`${this._cartUrl}/toggle_selection`, {
      isSelected,
      productId,
    });
  }

  updateProductQuantity(quantity: number, productId: string) {
    return this.http.put<PutResponseType>(`${this._cartUrl}/update_quantity`, {
      productId,
      quantity,
    });
  }
}
