import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() title!: string;
  @Input() image!: string;
  @Input() price!: number;
  @Input() discount!: number;
  priceAfterDiscount!: number;

  ngOnInit() {
    this.priceAfterDiscount = Math.round(this.price - (this.price * (this.discount/100)));
  }

}
