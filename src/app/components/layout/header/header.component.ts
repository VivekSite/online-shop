import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    FloatLabelModule,
    ReactiveFormsModule,
    CommonModule,
    MenuModule,
    DividerModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => console.log("It's working")
          },
          {
            label: 'LogOut',
            icon: 'pi pi-sign-out',
            command: () => console.log("It's working"),
          },
        ],
      },
    ];
  }
}
