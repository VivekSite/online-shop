import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  return authService
    .verifyToken(token)
    .pipe(
      map(() => true),
      catchError(() => of(false))
    )
    .pipe(
      map((isAllowed) => {
        if (isAllowed) {
          return true;
        } else {
          router.navigate(['/sign-in']);
          return false;
        }
      })
    );
};
