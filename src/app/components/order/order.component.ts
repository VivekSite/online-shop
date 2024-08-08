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
  @Input() cancelOrder!: (orderId: string) => void;
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
  cancelDate!: string;
  orderAddress!: AddressType;

  constructor(private router: Router) {}

  getDateString(time: number | null): string {
    const date = new Date(time ? time : 0);
    return `${date.getDate()} ${
      this.months[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  ngOnInit(): void {
    this.isLoading$.subscribe((data) => {
      this.isLoading = data;
    });
    this.orderDate = this.getDateString(this.order.created_at);
    this.cancelDate = this.getDateString(this.order.cancelled_at);
    this.orderAddress = this.order.shipping_address;
  }

  navigate(route: string, productId: string) {
    this.router.navigate([route, productId]);
  }
}
