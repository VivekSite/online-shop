import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { ProductType } from '../../types';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: ProductType[] = [];
  private productRef!: Subscription;

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this.productRef = this._productService.getAllProducts().subscribe((res) => {
      this.products = res.products;
    });
  }

  ngOnDestroy() {
    this.productRef.unsubscribe();
  }
}
