import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductComponent } from './components/product/product.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

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
    path: 'profile',
    canActivate: [authGuard],
    component: ProfileComponent
  },
  {
    path: 'product/:productId',
    component: ProductComponent
  },
];
