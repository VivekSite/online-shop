import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AccountComponent } from './components/account/account.component';
import { ProductComponent } from './components/product/product.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';

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
    path: 'product/:productId',
    component: ProductComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];
