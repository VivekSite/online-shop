import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderType } from '../../types';
import { BehaviorSubject, Subscription, firstValueFrom } from 'rxjs';

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

    this.cancelOrder = async (orderId: string) => {
      // Cancel the order
      const CancelOrderRes = await firstValueFrom(
        this.orderService.CancelOrder(orderId)
      );

      // Show notification
      let cancelledOrder: OrderType;
      this.toast.success('Success', CancelOrderRes.message);

      // Update order details on frontend
      this.orders = this.orders.map((order) => {
        if (order._id === orderId) {
          cancelledOrder = order;
          order.cancelled_at = CancelOrderRes.cancelled_at;
          order.shipping_status = 'cancelled';
          order.payment_status = 'cancelled';
          order.is_cancelled = true;
        }
        return order;
      });

      // Get the order details
      const GetOrderByIdRes = await firstValueFrom(
        this.orderService.GetOrderById(orderId)
      );

      // Send Whatsapp message if it is verified
      if (
        GetOrderByIdRes.order.user_id.mobile &&
        GetOrderByIdRes.order.user_id.isMobileVerified
      ) {
        await firstValueFrom(
          this.whatsappMessage.SendWhatsappMessage(
            GetOrderByIdRes.order.user_id.mobile,
            `Hey, ${GetOrderByIdRes.order.user_id.name} \nYou just cancelled your order with orderId: ${orderId} \nAnd the product was ${GetOrderByIdRes.order.product.title}`
          )
        );
      }
    };
  }

  ngOnDestroy(): void {
    this.orderRef.unsubscribe();
    this.ordersRef.unsubscribe();
  }
}
