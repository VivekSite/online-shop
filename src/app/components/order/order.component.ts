import { Component, Input, OnInit } from '@angular/core';
import { OrderType } from '../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    const date = new Date(this.order.created_at ? this.order.created_at : 0);
    this.orderDate = `${date.getDate()} ${
      this.months[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  navigate(route: string, productId: string) {
    this.router.navigate([route, productId]);
  }
}
