import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AccountComponent } from './components/account/account.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'account',
    canActivate: [authGuard],
    component: AccountComponent
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    component: CartComponent
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    component: OrdersComponent
  },
  {
    path: 'product/:productId',
    component: ProductDetailComponent,
  },
  {
    path: 'search',
    component: SearchComponent
  }
];
