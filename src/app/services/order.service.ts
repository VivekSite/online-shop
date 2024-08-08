import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { OrderType, ProductType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderUrl: string = `${environment.BASE_URL}/orders`;
  private productUrl: string = `${environment.BASE_URL}/products`;

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
    payment_method: string
  ) {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.orderUrl}/add`,
      {
        productId,
        addressId,
        quantity,
        payment_method,
      }
    );
  }

  CancelOrder(orderId: string) {
    return this.http.patch<{ success: boolean; message: string, cancelled_at: number }>(
      `${this.orderUrl}/${orderId}`,
      {}
    );
  }
}
