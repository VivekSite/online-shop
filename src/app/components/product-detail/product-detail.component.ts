import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { CarouselModule } from 'primeng/carousel';
import { ProductType } from '../../types';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  images: any[] = [];
  responsiveOptions: any[] | undefined = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  product!: ProductType;
  ProductRef!: Subscription;
  priceAfterDiscount!: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.ProductRef = this.productService
        .getProductById(params['productId'])
        .subscribe((res: { success: boolean; products: ProductType[] }) => {
          this.product = res.products[0];
          this.images = res.products[0].images;
          this.priceAfterDiscount = Math.round(
            this.product.price -
              this.product.price * (this.product.discount / 100)
          );
        });
    });
  }

  AddThisProductToCart() {
    this.productService
      .addToCart(this.product._id)
      .subscribe((data) => console.log(data));
  }

  navigate(route: string, productId: string) {
    this.router.navigate([route, productId]);
  }

  ngOnDestroy(): void {
    this.ProductRef.unsubscribe();
  }
}
