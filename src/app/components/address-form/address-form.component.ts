import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { DialogModule } from 'primeng/dialog';
import { AddressFormType, AddressType } from '../../types';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    DialogModule,
    CommonModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent implements OnInit {
  @Input() header!: string;
  @Input() visible!: boolean;
  @Input() type!: 'Create' | 'Update';
  @Input() existingAddress: AddressType | undefined | null = null;

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter<FormGroup<AddressFormType>>();
  addressForm!: FormGroup<AddressFormType>;
  constructor(private fb: FormBuilder) {}

  emitFormData() {
    this.onSubmit.emit(this.addressForm);
  }

  emitOnClose() {
    this.visible = false;
    this.onClose.emit(this.visible);
  }

  ngOnInit(): void {
    if (this.existingAddress) {
      this.addressForm = this.fb.group({
        full_name: [
          this.existingAddress.full_name,
          [Validators.required, Validators.minLength(3)],
        ],
        mobile_number: [
          this.existingAddress.mobile_number,
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        state: [this.existingAddress.state, [Validators.required]],
        city: [this.existingAddress.city, [Validators.required]],
        pin_code: [this.existingAddress.pin_code, [Validators.required]],
        landmark: [this.existingAddress.landmark],
        address: [this.existingAddress.address],
      });
    } else {
      this.addressForm = this.fb.group({
        full_name: ['', [Validators.required, Validators.minLength(3)]],
        mobile_number: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        pin_code: ['', [Validators.required]],
        landmark: [''],
        address: [''],
      });
    }
  }

  isInValidField(field: string): boolean {
    const input = this.addressForm.get(field);
    return !!(input?.dirty && input?.invalid);
  }
}
