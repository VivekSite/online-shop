import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { AddressType, OrderType } from '../../types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OverlayPanelModule, CommonModule, ButtonModule, SkeletonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  @Input() order!: OrderType;
  @Input() isLoading$!: Observable<boolean>;
  isLoading: boolean = true;
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  orderDate!: string;
  orderAddress!: AddressType;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const date = new Date(this.order.created_at ? this.order.created_at : 0);
    this.orderDate = `${date.getDate()} ${
      this.months[date.getMonth()]
    } ${date.getFullYear()}`;

    this.orderAddress = this.order.shipping_address;
    this.isLoading$.subscribe((data) => {
      this.isLoading = data;
    })
  }

  navigate(route: string, productId: string) {
    this.router.navigate([route, productId]);
  }
}
