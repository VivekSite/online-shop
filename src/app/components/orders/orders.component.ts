import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderType } from '../../types';
import { BehaviorSubject, Subscription } from 'rxjs';

import { OrderService } from '../../services/order.service';
import { OrderComponent } from '../order/order.component';
import { NotificationService } from '../../services/notification.service';
import { WhatsappMessageService } from '../../services/whatsapp-message.service';

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
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  cancelOrder!: (orderId: string) => void;

  order!: OrderType;
  orderRef!: Subscription;

  constructor(
    private orderService: OrderService,
    private toast: NotificationService,
    private whatsappMessage: WhatsappMessageService
  ) {}

  ngOnInit(): void {
    this.isLoading$.next(true);
    this.ordersRef = this.orderService.GetOrders().subscribe((res) => {
      this.orders = res.orders;
      this.isLoading$.next(false);
    });

    this.cancelOrder = (orderId: string) => {
      this.orderService.CancelOrder(orderId).subscribe((res) => {
        if (res.success) {
          let cancelledOrder: OrderType;
          this.toast.success('Success', res.message);
          this.orders = this.orders.map((order) => {
            if (order._id === orderId) {
              cancelledOrder = order;
              order.cancelled_at = res.cancelled_at;
              order.shipping_status = 'cancelled';
              order.payment_status = 'cancelled';
              order.is_cancelled = true;
            }
            return order;
          });

          this.orderRef = this.orderService
            .GetOrderById(orderId)
            .subscribe((res) => {
              this.order = res.order;
              this.whatsappMessage
                .SendWhatsappMessage(
                  res.order.user_id.mobile,
                  `You just cancelled the order with orderId: ${orderId}`
                )
                .subscribe();
            });
        }
      });
    };
  }

  ngOnDestroy(): void {
    this.orderRef.unsubscribe();
    this.ordersRef.unsubscribe();
  }
}
