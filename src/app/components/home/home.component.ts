import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductType } from '../../types';
import { Subscription } from 'rxjs';

import { SkeletonModule } from 'primeng/skeleton';

import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, SkeletonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  products: ProductType[] = [];
  private productRef!: Subscription;

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this.isLoading = true;
    this.productRef = this._productService.getAllProducts().subscribe((res) => {
      this.products = res.products;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.productRef.unsubscribe();
  }
}
