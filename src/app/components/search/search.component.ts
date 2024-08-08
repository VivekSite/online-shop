import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SkeletonModule } from 'primeng/skeleton';

import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { ProductType } from '../../types';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ProductComponent, CommonModule, SkeletonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  products: ProductType[] = [];
  private productRef!: Subscription;
  private queryParamsRef!: Subscription;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.queryParamsRef = this.route.queryParams.subscribe((params) => {
      this.productRef = this.productService
        .getProductsByQuery(params['query'])
        .subscribe((res) => {
          this.products = res.products;
          this.isLoading = false;
        });
    });
  }

  ngOnDestroy() {
    this.queryParamsRef.unsubscribe();
    this.productRef.unsubscribe();
  }
}
