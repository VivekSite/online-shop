import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductType } from '../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: ProductType;
  priceAfterDiscount!: number;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.priceAfterDiscount = Math.round(
      this.product.price - this.product.price * (this.product.discount / 100)
    );
  }

  AddThisProductToCart() {
    this.productService
      .addToCart(this.product._id)
      .subscribe((data) => console.log(data));
  }

  navigate(route: string, productId: string) {
    this.router.navigate([route , productId]);
  }
}
