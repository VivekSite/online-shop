import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ProductType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _productUrl = `${environment.BASE_URL}/product`;
  private _cartUrl: string = `${environment.BASE_URL}/user/cart`;
  private _sellerUrl: string = `${environment.BASE_URL}/seller`;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<{ products: ProductType[] }>(this._productUrl);
  }

  getProductsByQuery(query: string) {
    const searchUrl: string = `${environment.BASE_URL}/product/search?query=${query}`;
    return this.http.get<{ products: ProductType[] }>(searchUrl);
  }

  addToCart(productId: string) {
    return this.http.post<{ success: boolean; message: string }>(
      this._cartUrl,
      { productId }
    );
  }

  getProductById(productId: string) {
    return this.http.get<{ success: boolean; products: ProductType[] }>(
      `${this._productUrl}?productId=${productId}`
    );
  }

  getMerchantNameById(sellerId: string) {
    return this.http.get<{ success: boolean, merchant_name: string }>(`${this._sellerUrl}/merchant_name?sellerId=${sellerId}`)
  }
}
