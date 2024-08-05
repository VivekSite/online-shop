import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderType } from '../../types';
import { Subscription } from 'rxjs';

import { OrderService } from '../../services/order.service';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderComponent, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: OrderType[] = [];
  ordersRef!: Subscription;

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.ordersRef = this.orderService.GetOrders().subscribe((res) => {
      this.orders = res.orders;
    });
  }

  ngOnDestroy(): void {
    this.ordersRef.unsubscribe();
  }
}
