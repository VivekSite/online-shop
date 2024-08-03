import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { OrderType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderUrl: string = `${environment.BASE_URL}/orders`;

  constructor(private http: HttpClient) {}

  GetOrders() {
    return this.http.get<{
      success: boolean;
      orders: OrderType[];
    }>(this.orderUrl);
  }

  PlaceOrder(
    productId: string,
    addressId: string,
    quantity: number,
    payment_method: string,
    payment_status: string,
    order_summary: {
      Subtotal: Number;
      Shipping: Number;
      Cash: Number;
      Total: Number;
      Promotion_Applied: Number;
      GrandTotal: Number;
    }
  ) {
    return this.http.post(`${this.orderUrl}/add`, {
      productId,
      addressId,
      quantity,
      payment_method,
      payment_status,
      order_summary
    });
  }
}
