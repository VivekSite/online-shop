import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { CartDataType, CartWithSubTotal } from '../types';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart = new BehaviorSubject<CartWithSubTotal>({
    products: [],
    user_id: '',
    _id: '',
    total: 0,
  });
  cart$ = this._cart.asObservable();

  private _cartUrl: string = `${environment.BASE_URL}/user/cart`;
  constructor(private http: HttpClient) {}

  getCartData() {
    return this.http.get<{ cartData: CartDataType }>(this._cartUrl);
  }

  toggleProductSelection(isSelected: boolean, productId: string) {
    return this.http.put(`${this._cartUrl}/toggle_selection`, {
      isSelected,
      productId,
    });
  }

  updateProductQuantity(quantity: number, productId: string) {
    return this.http.put(`${this._cartUrl}/update_quantity`, {
      productId,
      quantity,
    });
  }

  GetSubTotal() {
    const cartValue = this._cart.value;
    const total = cartValue.products.reduce((sum, item) => {
      if (item.isSelected) {
        return sum + item._id.price * item.quantity;
      }
      return sum;
    }, 0);
    this._cart.next({ ...cartValue, total });
  }
}
