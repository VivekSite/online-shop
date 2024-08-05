import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    AvatarModule,
    CommonModule,
    MenuModule,
    SearchBarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Account',
            icon: 'pi pi-user',
            command: () => this.router.navigate(['/account']),
          },
          {
            label: 'Wish list',
            icon: 'pi pi-list',
            command: () => this.router.navigate(['/wishlists']),
          },
          {
            label: 'Orders',
            icon: 'pi pi-truck',
            command: () => this.router.navigate(['/orders']),
          },
          {
            label: 'Cart',
            icon: 'pi pi-shopping-cart',
            command: () => this.router.navigate(['/cart'])
          },
          {
            label: 'LogOut',
            icon: 'pi pi-sign-out',
            command: () => {
              this._authService.logoutUser();
              this.router.navigate(['']);
            },
          },
        ],
      },
    ];
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  isLoggedIn() {
    return this._authService.getToken();
  }
}
