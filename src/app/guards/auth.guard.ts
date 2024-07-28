import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).IsLoggedIn()) return true;

  inject(Router).navigate(['/sign-in']);
  return false;
};
