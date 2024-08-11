import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductType } from '../../types';

import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  @Input() product!: ProductType;
  priceAfterDiscount!: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private toast: NotificationService
  ) {}

  ngOnInit() {
    this.priceAfterDiscount = Math.round(
      this.product.price - this.product.price * (this.product.discount / 100)
    );
  }

  AddThisProductToCart() {
    this.productService.addToCart(this.product._id).subscribe((data) => {
      if (data.success) {
        this.toast.success('Success', 'Product added to the cart successfully');
      } else if (data.message.includes('already exists!')) {
        this.toast.info('Success', 'Product is already added to the cart!');
      } else {
        this.toast.error('Something went wrong', data.message);
      }
    });
  }

  navigate(route: string, productId: string) {
    this.router.navigate([route, productId]);
  }
}
