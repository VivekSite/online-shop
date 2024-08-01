import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let tokenizedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.getToken()}`,
    }
  })

  return next(tokenizedReq)
};
