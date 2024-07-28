import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { ProductType } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: ProductType[] = [];

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this._productService.getAllProducts().subscribe((res) => {
      this.products = res.products;
    });
  }
}
