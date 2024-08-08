import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';

      toast.error(`${error.status} ${error.statusText}`, error.error.message)
      console.log(error);

      errorMsg = error.error.message || "Something went wrong"
      return throwError(() => new Error(errorMsg));
    })
  );
};
