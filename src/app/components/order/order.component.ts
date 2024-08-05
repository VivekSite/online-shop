import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { AddressType, OrderType } from '../../types';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OverlayPanelModule, CommonModule, ButtonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  @Input() order!: OrderType;
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
    // this.orderAddress = `
    //   ${shipped?.address.line1}
    //   ${shipped?.address.line2}
    //   ${shipped?.city}, ${shipped?.state} ${shipped?.pin_code}
    //   ${shipped?.country}
    // `;
  }

  navigate(route: string, productId: string) {
    this.router.navigate([route, productId]);
  }
}
