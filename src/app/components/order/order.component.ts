import { Component, Input } from '@angular/core';
import { OrderType } from '../../types';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  @Input() order!: OrderType;
}
