import { authGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { WishlistsComponent } from './components/wishlists/wishlists.component';
import { AccountComponent } from './components/account/account.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SearchComponent } from './components/search/search.component';
import { OrdersComponent } from './components/orders/orders.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountManageComponent } from './components/account-manage/account-manage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'account',
    canActivate: [authGuard],
    component: AccountComponent,
  },
  {
    path: 'account/manage',
    canActivate: [authGuard],
    component: AccountManageComponent
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    component: CartComponent,
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    component: OrdersComponent,
  },
  {
    path: 'wishlists',
    canActivate: [authGuard],
    component: WishlistsComponent,
  },
  {
    path: 'product/:productId',
    component: ProductDetailComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
];
