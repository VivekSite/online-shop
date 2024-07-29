import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ProductType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _productUrl = `${environment.BASE_URL}/product`;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<{ products: ProductType[] }>(this._productUrl);
  }

  getProductsByQuery(query: string) {
    const searchUrl: string = `${environment.BASE_URL}/product/search?query=${query}`;
    return this.http.get<{ products: ProductType[] }>(searchUrl);
  }
}
