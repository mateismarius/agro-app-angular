import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyRequestCount = 0;
  constructor(private spinnerService: NgxSpinnerService) {}

  busy() {
    // Increment the count of current "busy" requests
    this.busyRequestCount++;

    // Display the loading indicator using the spinner service
    this.spinnerService.show(undefined, {
      type: 'ball-spin-clockwise-fade-rotating',
      bdColor: 'rgba(0,0,0,0.5)',
      color: '#34ebe5',
    });
  }

  idle() {
    // Decrement the count of current "busy" requests
    this.busyRequestCount--;

    // If there are no more "busy" requests, hide the loading indicator
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }

}
