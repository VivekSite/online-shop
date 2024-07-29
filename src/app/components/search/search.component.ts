import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { ProductType } from '../../types';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  products: ProductType[] = [];
  private productRef!: Subscription;
  private queryParamsRef!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.queryParamsRef = this.route.queryParams.subscribe((params) => {
      this.productRef = this.productService
        .getProductsByQuery(params['query'])
        .subscribe((res) => {
          this.products = res.products;
        });
    });
  }

  ngOnDestroy() {
    this.queryParamsRef.unsubscribe();
    this.productRef.unsubscribe();
  }
}
