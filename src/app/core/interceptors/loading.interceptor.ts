import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Set the "busy" flag to indicate that a request is in progress
    this.busyService.busy();

    // Forward the original request to the next interceptor or the backend service,
    // and delay the response by 1 second
    return next.handle(request).pipe(
      delay(1000),

      // Perform this action when the observable completes or errors
      finalize(() => {
        // Set the "idle" flag to indicate that the request is complete
        this.busyService.idle();
      })
    );
  }

}
