import { Component, Input } from '@angular/core';
import { AddressType } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  @Input() address!: AddressType;
  @Input() deleteAddress!: (AddressId: string) => void;
  @Input() updateDefaultAddress!: (AddressId: string) => void;


}
