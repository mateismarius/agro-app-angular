import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toaster: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          if (error.status === 400) {
            if (error.error.errors) {
              // if the error response has an "errors" property, throw the error object
              throw error.error;
            }
            // otherwise, display the error message as a toast message
            this.toaster.error(error.error.message, error.status.toString());
          }
          if (error.status === 401) {
            // display the error message as a toast message
            this.toaster.error(error.error.message, error.status.toString());
          }
          if (error.status === 404) {
            // navigate to the "not-found" page
            this.router.navigateByUrl('/not-found');
          }
          if (error.status === 500) {
            // navigate to the "server-error" page with the error object as state
            const navigationExtras: NavigationExtras = {
              state: { error: error.error },
            };
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
        }
        // return a new Error object as the observable error
        return throwError(() => new Error(error.message));
      })
    );
  }
}
